// const session = require('express-session');
// const checkAttendance = async(req, res, next) => {
//     // Fetch the attendance data for the logged-in student from MongoDB.
//     // Calculate the attendance percentage and store it in a variable (e.g., attendancePercentage).
//     const attendancePercentage = /* Calculate attendance percentage */65;

//     // Check if attendance is above 60%.
//     if (attendancePercentage > 60) {
//         req.session.attendanceAbove60 = true;
//     } else {
//         req.session.attendanceAbove60 = false;
//     }
//     next();
// };

// module.exports = checkAttendance;