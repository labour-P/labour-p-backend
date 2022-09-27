import request from "request";
		

export const sms = async (req, res, next) => {
	const {phone}=req;
	// console.log(phone);
    try {
		
		var data = {
					 "api_key": "TL6Rr8Azc8uOtpxBXWouMxCzZnfAENdVh8D9CtsiiJSq2OAPJo6TcjvmmlQgvb",
					 "pin_type": "NUMERIC",
					 "phone_number": phone,
					 "pin_attempts": 3,
					 "pin_time_to_live": 3,
					 "pin_length": 6
				  };
		var options = {
		'method': 'POST',
		'url': 'https://api.ng.termii.com/api/sms/otp/generate',
		'headers': {
		  'Content-Type': ['application/json', 'application/json']
		},
		body: JSON.stringify(data)
		
		};
		request(options, function (error, response) { 
		if (error) throw new Error(error);
		console.log(response.body);
		return response.body;
		});		

            }catch(error){
				next(error);
			}

        }