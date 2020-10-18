<?

 $spojeni = mysql_connect('mysql.webzdarma.cz', '********', '*******' );
	mysql_select_db(naturalsessio, $spojeni);


	$num = mysql_query("select count(*) as 100 from chemia where id_cl = $id");

		/*$ID = $_POST['ID'];
		$kto = $_POST['kto'];
		$kedy=$_POST['kedy'];
		$tema = $_POST['tema'];
		$text = $_POST['text'];
		$c = Date("H:i:s    d.m.Y");*/
$vysledek1 = mysql_query( "select * from chemia order by ID desc LIMIT 0,100", $spojeni);

@$h = mysql_num_rows($vysledek1);
            for ($i=0;$i<=$h-1;$i++) {
    			echo  "<table>";
     			 echo  "<tr><td>".mysql_result($vysledek1,$i,"kedy")."</tr></td>";
 			echo   "<tr><td><font color=#848484; size=5>".mysql_result($vysledek1,$i,"kto")."</font></td></tr>";
      			 echo "<tr><td><font color=#0000cc; size=4>".mysql_result($vysledek1,$i,"tema")."</font></td></tr>" ;
      			 echo "<tr><td>".mysql_result($vysledek1,$i,"text")."</td></tr>";
			echo "<hr>";
			echo "</table>";
			}


?>