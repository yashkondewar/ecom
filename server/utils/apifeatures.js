class ApiFeatures{
    constructor(query, querystr){
        this.query = query;
        this.querystr= querystr;
    }

    search(){
        const key = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {};

        this.query = this.query.find({...key})
        return this;
    }

    filter(){
        const queryCopy = {...this.querystr}  //to make copy {queryCopy=this.query} always passes through reference
        const fieldsToFilter = ["keyword", "page", "limit"];

        // console.log(queryCopy);
        fieldsToFilter.forEach((it)=>delete queryCopy[it]);
        // console.log(queryCopy);
        
        let querystr = JSON.stringify(queryCopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (it)=> `$${it}`)
        
        this.query = this.query.find(JSON.parse(querystr));
        // console.log(querystr);
        return this
    }

    pageination(resultPerPage){
        const currentPage = Number(this.querystr.page) || 1;

        const skip = resultPerPage * (currentPage-1);
        // console.log(`${currentPage}  ${skip}`)
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures