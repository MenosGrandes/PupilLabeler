
<?php
$handle = opendir(dirname(realpath(__FILE__)).'/images/');

while($file = readdir($handle)){
  if($file !== '.' && $file !== '..'){
      $onClick = "'";
      $onClick .=(string)$file;
      $onClick .="'";
    echo '<img src="images/'.$file.'" border="0" height="40" width="40" hspace="5" margin="0px" onClick="setBackgroundImage('.$onClick.')"/>';
  }
}
?>
