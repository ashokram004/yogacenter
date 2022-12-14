import {useEffect} from "react";
import axios from "axios"

function Temp() {

useEffect(() => {
	axios.get("https://jsonplaceholder.typicode.com/todos")
	.then((response) => console.log(response.data));
	}, []);

return (
	<div>
		Different ways to fetch Data
	</div>
);
}

export default Temp;
