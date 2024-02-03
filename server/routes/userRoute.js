const express = require("express");
const {registerUser, login, logout, forgotPassword, resetPassword, getUserDetails, changePassword, updateProfile, getAllUsers, getSingleUserInfo, updateUserRole, deleteUser} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/loginuser").post(login)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").post(resetPassword)

router.route("/logout").get(logout)
router.route("/profile").get(isAuthenticatedUser, getUserDetails)
router.route("/changepassword").put(isAuthenticatedUser, changePassword)
router.route("/profile/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"),getAllUsers);
router.route("/admin/users/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"),getSingleUserInfo)
    .put(isAuthenticatedUser, authorizeRoles("admin"),updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteUser)


module.exports = router;