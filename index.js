const UserModel = require('./models/User');
// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mfc'
      )
      .then(()=>console.log('connected'))
      .catch(e=>console.log(e));


// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new UserModel(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/login", async (req, resp) => {
	try {
        const {email, password} = req.body;
        UserModel.findOne({email: email})
        .then(user => {
            if(user) {
                console.log(password);
                console.log(user.password);
                if(password==user.password){
                    return resp.json({Status: "Success"})

               }else {
                        return resp.json("The password is incorrect")
               }
               
            } else {
                return resp.json("No record existed")
            }
        })
		

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.listen(5000);
