<?php


/*
Read post request which contains json object.
decode it as array;
read data.json as text.
decode data.json as array of jsonObjects;
search if the requested json object is already in file.
if it is change it only,
if not add new on.
*/
$json = $_POST['json'];
//$json = '{"name":"images/a - Copy (14).jpg';
$decodedPost = json_decode($json,true); 
$fileContents = file_get_contents('data.json');
$decodedFile = json_decode($fileContents, true);

$found = false;
foreach($decodedFile as &$item )
{
    if($decodedPost["name"] == $item["name"])
    {
      echo json_encode($item); 
      exit();
      break;
      
    }
}

echo json_encode('{"name":"error"}');

?>
