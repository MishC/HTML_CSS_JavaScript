<? session_start();
include 'page3.php';
function scitavanie($cislo1,$cislo2){
	
	$sum = $cislo1 + $cislo2;
    
	return $sum;
	};
	function redirect($url, $statusCode = 303)
	{
   header('Location: ' . $url, true, $statusCode);
   die();
	}
	
		if (empty($_POST['aanswer'])) {
        $_SESSION['errors'] = 'Please answer the question';
		header('Location: formular1.php');

		} 
		elseif  ($_POST['aanswer']==$_SESSION['huhu'])   {
		$spojeni = mysql_connect('mysql.webzdarma.cz', 'naturalsessio', 'Travnica_11' );
		mysql_select_db(naturalsessio, $spojeni);
        $c = Date("H:i:s    d.m.Y");
		$kto = $_POST['kto'];
		$kedy=$c;
		$tema = $_POST['tema'];
		$text = $_POST['text'];
	
	@$vysledek2 = @mysql_query( "insert into chemia set kedy=Now(), kto='$kto', tema='$tema', text='$text';", $spojeni);
	if (!$vysledek2): echo('Chyba v spojeni s databazou'); endif;
	$_SESSION['errors']='';
	unset($_SESSION['errors']);
	
	header('Location: formular1.php');

	}
	elseif  ($_POST['aanswer']!=$_SESSION['huhu']) 
	{  
        $_SESSION['errors'] = 'Incorrect answer.';
	header('Location: formular1.php');
	} 
	
	?>