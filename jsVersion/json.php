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
//$json = '{"name":"images/a - Copy (14).jpg","left":495.5,"top":5123,"width":101,"height":10121}';
$decodedPost = json_decode($json,true); 
$fileContents = file_get_contents('data.json');
$decodedFile = json_decode($fileContents, true);


$alreadyInFile = False;
foreach($decodedFile as &$item )
{
    if($decodedPost["name"] == $item["name"])
    {
      var_dump($decodedPost["name"]);
      $item["left"] =  $decodedPost["left"];
      $item["top"] =   $decodedPost["top"];
      $item["width"] =$decodedPost["width"];
      $item["height"]= $decodedPost["height"];
      $item["scaleX"]= $decodedPost["scaleX"];
      $item["scaleY"]= $decodedPost["scaleY"];
      $item["rx"]= $decodedPost["rx"];
      $item["ry"]= $decodedPost["ry"];

      $alreadyInFile = True;
      break;
    }
}
if(!$alreadyInFile)
{
array_push($decodedFile,$decodedPost);
}
$encodeJson = json_encode($decodedFile); 
file_put_contents("data.json", $encodeJson);


?>
