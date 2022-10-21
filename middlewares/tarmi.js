import request from "request";
		

export const sms = async (req, res, next) => {
	const {phone}=req;
	console.log(phone);
    try {
		
		const token = Math.floor( Math.random() * (9999999 - 1000000) + 1000000);
		 
		var data = {"api_token": "VT1XrGg3X01CaRv5lJrBn09DJ1MPtVkPKfjxVjsHYdUZMv6IjEzzA62xPScn",
        "from":"LabourP",
        "to": phone,
        "body": " Your OTP is "+ token+"",
        "dnd":"2"
	};
	  
		var options = {
		'method': 'POST',
		'url':'https://www.bulksmsnigeria.com/api/v1/sms/create',
		// 'url': 'https://api.ng.termii.com/api/sms/otp/generate',
		'headers': {
		  'Content-Type': ['application/json', 'application/json']
		},
		body: JSON.stringify(data)
		
		};
		request(options, function (error, response) { 
		if (error) throw new Error(error);
		console.log(response.body);
		return res.send(response.body);
		});		

            }catch(error){
				next(error);
			}

        }