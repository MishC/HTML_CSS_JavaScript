<?include 'page3.php';
unset($d);
function scitavanie($cislo1,$cislo2){
	
	$sum = $cislo1 + $cislo2;
    
	return $sum;
	}
	$h=scitavanie($_SESSION['num1'],$_SESSION['num2']);
	$_SESSION['huhu'] = $h;?>
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<TITLE>::kvantovka::</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1250">
<meta http-equiv="cache-control" content="no-cache" />
<style type="text/css">
BODY {background-color:#000000; margin-left: 120px; margin-right: 120px; margin-top: 0px;}
td {font-weight: 900;   background-color: #f5f5f5 }
td.blue {font-color:#33CCFF}
p{font-color:#ffffff}
TABLE {width: 100%;  align:center; margin-top: 0px; padding: 0 px; background-color: #f5f5f5;
 table-layout: fixed;border:2px; border-color:#f5f5f5}
img{margin-top:0px;  border:0px; align:center;valign:middle;}
fieldset {border: 0;}
hr {shade:noshade; align:center;}
a {color:#000000;}
a:visited {color:#999966}
a:href {color:#999966}
a.new {color:#663300; font-size:22px}
</style>
</HEAD>

<body>
<table>
<tr><td style="text-align: center">
<img src="cat.jpg" alt="cat"  border="0" width="420" height="375">
</td></tr>
<tr><td>
<form method="post" action="formular2.php" >
<fieldset>
<table>

<tr><td width="5%">  Kto  </td>
<td width="40%">
<input type="text" name="kto" style="width: 40%" >
</td>
</tr>
<tr>
<td width="5%">  Kedy  </td>
<td width="40%">
<input type="text" name="kedy" value="<?php echo Date("H:i:s    d.m.Y") ?>" style="width: 40%" >
</td>
</tr>
<tr>
<td width="5%">  Tema  
</td>
<td width="40%">
<input type="text" name="tema" style="width: 40%" >
</td>
</tr>
<tr>
<td width="5%">  Text  </td>
<td width="50%">
<textarea  name="text" cols="50" rows="10" size="10" wrap="hard" >
</textarea>

<br>

<p style="margin-top:0px;padding-top:0;">


<span Label for="question"> How much is <?  echo $_SESSION["num1"] . ' + ' . $_SESSION["num2"] . '?' ?></span>
<br style="height:35px;" > <input type="number" name="aanswer" id="aanswer"></br>

</p>

<tr><td>

<input type="submit" name="Submit" value="Send" align="right" style="margin-left: 400px;" >
</td></tr>

</fieldset>
</form>

</table>
<tr><td>
<span><? if(isset($_SESSION['errors'])) {?> <span class="error"><?php echo $_SESSION['errors'];?></span><?php }?></span>
</td></tr>

<br>
<tr><td><hr></td></tr>
<tr><td>

<p><a class ="new" href="http://naturalsession.wz.cz/kvantovka/kvantovka.html" color="#000066"><<  [BACK] </a></p>

</td></tr>
</table>

<br>
<?
include 'new3.php'

?>
</body>
</HTML>