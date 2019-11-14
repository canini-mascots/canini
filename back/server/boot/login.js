// module.exports = function (app) {
// 	//get User model from the express app
// 	var UserModel = app.models.Customer;

// 	app.post('/api/customers/login', function (req, res) {		

// 		//parse user credentials from request body
// 		const userCredentials = {
// 			"email": req.body.email,
// 			"password": req.body.password
// 		}
// 		UserModel.login(userCredentials,function (err, token) {			
// 			if (err) {
// 				res.status(401).json({"error": {"message":"wrongUserPas"}});
// 				return res;
//             }
//             else {
//                 res.status(200).json(token);

//             }
		
// 		});
//     });
// }