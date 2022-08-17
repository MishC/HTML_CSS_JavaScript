<?session_start();?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<TITLE>::kvantovka::</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1250">
<meta http-equiv="cache-control" content="no-cache" />
<style type="text/css">
BODY {background-color:#000000; margin-left: 120px; margin-right: 120px; margin-top: 0px;}
td {font-weight: 900;   background-color: #f5f5f5 }
p{font-color:#ffffff}
TABLE {width: 100%;  align:center; margin-top: 0px; background-color: #f5f5f5;
 table-layout: fixed;border:2px; border-color:#f5f5f5}
img{margin-top:0px;  border:0px; align:center;valign:middle;}
fieldset {border: 0;}
hr {shade:noshade; align:center;}
a {color:#000000;}
a:visited {color:#999966}
a:href {color:#999966}
a.new {color:#1A1A1A; font-size:18px}
</style>
</HEAD>

<body>

<?

$c = Date("H:i:s    d.m.Y");

	/*if(isset($_SESSION["sum"])){
	$cc=$_SESSION["sum"];
	
	}*/
	
	function scitavanie(&$cislo1,&$cislo2){
	
	$sum = $cislo1 + $cislo2;
    
	return $sum;
	}

 function gener1()
	{$num1 = rand(10, 100);
	return $num1;}
	function gener2() {
    $num2 = rand(5, 50);
	return $num2;}
	 

$aa=gener1();
$bb=gener2();
	$_SESSION["num1"] = $aa;
	$_SESSION["num2"] = $bb;
	
	?>	

<table>
<tr><td style="text-align: center">
<img src="cat.jpg" alt="cat"  border="0" width="420" height="375">
</td></tr>
<tr><td>
<form method="post" action="formular1.php" >
<fieldset>
<table>

<tr><td width="5%">&nbsp;&nbsp;Kto&nbsp;&nbsp;</td>
<td width="40%">
<input type="text" name="kto" style="width: 40%" >
</td>
</tr>
<tr>
<td width="5%">&nbsp;&nbsp;Kedy&nbsp;&nbsp;</td>
<td width="40%">
<input type="text" name="kedy" value="<?php echo $c ?>" style="width: 40%" >
</td>
</tr>
<tr>
<td width="5%">&nbsp;&nbsp;Tema&nbsp;&nbsp;
</td>
<td width="40%">
<input type="text" name="tema" style="width: 40%" >
</td>
</tr>
<tr>
<td width="5%">&nbsp;&nbsp;Text&nbsp;&nbsp;</td>
<td width="50%">
<textarea  name="text" cols="50" rows="10" size="10" wrap="hard" >
</textarea>

<br>
<tr><td>
<p style="margin-top:0px;padding-top:0;">


<span Label for="question"> What is <?  echo $_SESSION["num1"] . ' + ' . $_SESSION["num2"] . '?' ?></span>
<br style="height:35px;" > <input type="number" name="aanswer" id="aanswer"></br>

</p>
</td></tr>
<tr><td>

<input type="submit" name="Submit" value="Send" align="right" style="margin-left: 350px;" >
</td></tr>

</fieldset>
</form>

</table>
	<?
	
$_SESSION["sum"]=scitavanie($_SESSION["num1"],$_SESSION["num2"]);
/*echo $aa[1]," ",$aa[2],"<br>";
$s= scitavanie($aa[1],$aa[2]);*/
echo "toto je suma".$_SESSION["sum"];
echo "<br>";
$a=$_POST['aanswer'];
echo "Toto je poslane".$a;
echo "<br>";
echo $cc;

	if (empty($_POST['aanswer'])) {
        $errors['answer'] = 'Please answer the question';
	} 
		elseif  ($a==($_SESSION["sum"]))   {

	  
	/* if ($a==b||$a==c||$a==$d)
	 if ($a==($b||$c||$d)) */
	
		$spojeni = mysql_connect('mysql.webzdarma.cz', 'naturalsessio', '*******' );
			mysql_select_db(naturalsessio, $spojeni);
        $c = Date("H:i:s    d.m.Y");
		$ID = $_POST['ID'];
		
		$kto = $_POST['kto'];
		$kedy=$c;
		$tema = $_POST['tema'];
		$text = $_POST['text'];
	

  	@$vysledek2 = @mysql_query( "insert into chemia set kedy=Now(), kto='$kto', tema='$tema', text='$text';", $spojeni);

	if (!$vysledek2): echo('Chyba v spojeni s databazou'); endif;

	} elseif  ($a!=($_SESSION["sum"])) {

        
        $errors['answer'] = 'Incorrect answer.';
		/*echo $_POST['aanswer'];*/
		
} 

?>

<tr><td>
<span><? if(isset($errors['answer'])) {?> <span class="error"><?php echo $errors['answer'];?></span><?php }?></span>
</td></tr>

<br>
<tr><td><hr></td></tr>
<tr><td>

<p><a class ="new" href="http://naturalsession.wz.cz/kvantovka/kvantovka.html" color="#ffffff"><<  [SPAT] </a></p>

</td></tr>
</table>

<br>

<?
include 'new3.php'
?>
</body>
</HTML>
