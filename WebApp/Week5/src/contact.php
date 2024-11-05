<?php
class server 
{
	private $data = null;
	private $rc = 500;		
	
	
	public function __construct()
	{
        $this->data = array();
	}

	
	public function __destruct()
	{
	}
	
	
	public function handleRequest()
	{
		sleep(2);
		
		if($_SERVER['REQUEST_METHOD'] === 'POST')
		{
			$this->postComment();
		}
		else
		{
			$this->rc = 405; 
		}
	
		http_response_code($this->rc);
	}
	
	
	private function postComment()
	{
		if(isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"]))
		{
			$email = $_POST["email"];
			$subject = $_POST["subject"];
			$message = $_POST["message"];
			
			if(empty($email) || empty($subject) || empty($message)) 
			{
				$this->rc = 400; 

			}
			else
			{
				$this->rc = 201; // OK - Created
			}
		}
		else
		{
			$this->rc = 400; // Bad Request: parameters missing
		}
	}
}
$server = new server();
$server->handleRequest();
?>
