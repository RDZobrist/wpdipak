<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jack's Testimony</title>
<link href="styles.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
<!--
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function YY_checkform() { //v4.71
//copyright (c)1998,2002 Yaromat.com
  var a=YY_checkform.arguments,oo=true,v='',s='',err=false,r,o,at,o1,t,i,j,ma,rx,cd,cm,cy,dte,at;
  for (i=1; i<a.length;i=i+4){
    if (a[i+1].charAt(0)=='#'){r=true; a[i+1]=a[i+1].substring(1);}else{r=false}
    o=MM_findObj(a[i].replace(/\[\d+\]/ig,""));
    o1=MM_findObj(a[i+1].replace(/\[\d+\]/ig,""));
    v=o.value;t=a[i+2];
    if (o.type=='text'||o.type=='password'||o.type=='hidden'){
      if (r&&v.length==0){err=true}
      if (v.length>0)
      if (t==1){ //fromto
        ma=a[i+1].split('_');if(isNaN(v)||v<ma[0]/1||v > ma[1]/1){err=true}
      } else if (t==2){
        rx=new RegExp("^[\\w\.=-]+@[\\w\\.-]+\\.[a-zA-Z]{2,4}$");if(!rx.test(v))err=true;
      } else if (t==3){ // date
        ma=a[i+1].split("#");at=v.match(ma[0]);
        if(at){
          cd=(at[ma[1]])?at[ma[1]]:1;cm=at[ma[2]]-1;cy=at[ma[3]];
          dte=new Date(cy,cm,cd);
          if(dte.getFullYear()!=cy||dte.getDate()!=cd||dte.getMonth()!=cm){err=true};
        }else{err=true}
      } else if (t==4){ // time
        ma=a[i+1].split("#");at=v.match(ma[0]);if(!at){err=true}
      } else if (t==5){ // check this 2
            if(o1.length)o1=o1[a[i+1].replace(/(.*\[)|(\].*)/ig,"")];
            if(!o1.checked){err=true}
      } else if (t==6){ // the same
            if(v!=MM_findObj(a[i+1]).value){err=true}
      }
    } else
    if (!o.type&&o.length>0&&o[0].type=='radio'){
          at = a[i].match(/(.*)\[(\d+)\].*/i);
          o2=(o.length>1)?o[at[2]]:o;
      if (t==1&&o2&&o2.checked&&o1&&o1.value.length/1==0){err=true}
      if (t==2){
        oo=false;
        for(j=0;j<o.length;j++){oo=oo||o[j].checked}
        if(!oo){s+='* '+a[i+3]+'\n'}
      }
    } else if (o.type=='checkbox'){
      if((t==1&&o.checked==false)||(t==2&&o.checked&&o1&&o1.value.length/1==0)){err=true}
    } else if (o.type=='select-one'||o.type=='select-multiple'){
      if(t==1&&o.selectedIndex/1==0){err=true}
    }else if (o.type=='textarea'){
      if(v.length<a[i+1]){err=true}
    }
    if (err){s+='* '+a[i+3]+'\n'; err=false}
  }
  if (s!=''){alert('The required information is incomplete or contains errors:\t\t\t\t\t\n\n'+s)}
  document.MM_returnValue = (s=='');
}
//-->
</script>
</head>

<body><br />
<br />


<div class="container">
 <?php require_once('head.php'); ?>

  <div class="padding">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="76%" align="left" valign="top"><span class="title">Contact</span><br />
          <br />
          <form action="../eformPHP/eform.php" method="post" name="form1" id="form1" onsubmit="YY_checkform('form1','salvation[0]','#q','2','Field \'salvation[0]\' is not valid.','salvation[1]','#q','2','Field \'salvation[1]\' is not valid.','name','#q','0','Field \'name\' is not valid.','email','S','2','Field \'email\' is not valid.','questions','3','1','Field \'questions\' is not valid.');return document.MM_returnValue">
            Would  you like additional information regarding God’s free gift of Salvation?  
            <input type="radio" name="salvation" id="salvation" value="yes" />
            Yes 
            <input type="radio" name="salvation" id="salvation" value="no" /> 
            No <br><br>
            Name:  
              <input name="name" type="text" id="name" size="40" />
            E-Mail: 
            <input name="email" type="text" id="email" size="30" />
            <br><br>
            Questions  &amp; Comments:<br />
              <br />
              <textarea name="questions" id="questions" cols="70" rows="10"></textarea>
                <br />
                <br />
You may also contact me <script type='text/javascript'><!--
var v2="RNUKMDSGURCVEIQ";var v7=unescape("%3A/%3B8%28*%13%2C1%21*x+%2C%25");var v5=v2.length;var v1="";for(var v4=0;v4<v5;v4++){v1+=String.fromCharCode(v2.charCodeAt(v4)^v7.charCodeAt(v4));}document.write('<a href="javascript:void(0)" onclick="window.location=\'mail\u0074o\u003a'+v1+'?subject=Salvation'+'\'">'+'by email<\/a>');
//--></script><noscript><a href='http://w2.syronex.com/jmr/safemailto/#noscript'>by email</a></noscript>.

<br />
                <br />
                <input type="submit" name="submit" id="submit" value="Submit" />
              <br>
          </form>
        </td>
        <td width="1%"></td>
        <td width="23%" align="center" valign="top"><img src="pic6.jpg" alt="hands on cross" width="200" height="196" class="pic" /></td>
      </tr>
    </table>
  </div>
</div>

</body>
</html>
