import request from "request";
		

export const sms = async (req, res, next) => {
	const {message}=req;
const {
	text,
	phonenum,
	token
}=message;

	// console.log(phone);
    try { 
       
		
		// var  = {
		// 			 "api_key": "TL6Rr8Azc8uOtpxBXWouMxCzZnfAENdVh8D9CtsiiJSq2OAPJo6TcjvmmlQgvb",
		// 			 "pin_type": "NUMERIC",
		// 			 "phone_number": phone,
		// 			 "pin_attempts": 3,
		// 			 "pin_time_to_live": 3,
		// 			 "pin_length": 6
		// 		  };
		var options = {
		'method': 'GET',
		'url': 'https://netbulksms.com/index.php?option=com_spc&comm=spc_api&username=labourp&password=labourp123&sender=LabourP&recipient='+phonenum+'&message='+text+token+'&',
		'headers': {
		  'Content-Type': ['application/json', 'application/json']
		},
		// body: JSON.stringify(data)
		
		};
		request(options, function (error, response) { 
		if (error) throw new Error(error);
		console.log(response.body);
		console.log(options);
		return response.body;
		});		

            }catch(error){
				next(error);
			}

        }