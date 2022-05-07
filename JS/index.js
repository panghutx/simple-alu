let status1;
let status2;
let operat=[0,0,0];
let carry=[0,0,0,0,0,0,0,0];
let num1;
let num2;
let mulNum;
let newNum=[0,0,0,0,0,0,0,0];
$(document).click(function(){
    
    //获取输入，通过复选框状态来判断是否选择，选中为true，未选中为false
    status1=[
        $("#sg15").is(":checked"),
        $("#sg14").is(":checked"),
        $("#sg13").is(":checked"),
        $("#sg12").is(":checked"),
        $("#sg11").is(":checked"),
        $("#sg10").is(":checked"),
        $("#sg9").is(":checked"),
        $("#sg8").is(":checked"),            
    ];
    
    //将数组中的true和false全变成1和0，然后以字符串形式相加，最后得到一个八位的二进制数的字符串
    for(let i=0;i<status1.length;i++){
        
        if(status1[i]==true){
            status1[i]=1;
        }else {
            status1[i]=0;
        }

    }
    

    //以下代码逻辑同上，算出num2的选中情况
    status2=[
        $("#sg7").is(":checked"),
        $("#sg6").is(":checked"),
        $("#sg5").is(":checked"),
        $("#sg4").is(":checked"),
        $("#sg3").is(":checked"),
        $("#sg2").is(":checked"),
        $("#sg1").is(":checked"),
        $("#sg0").is(":checked"),            
    ];


    
    //将数组中的true和false全变成1和0，然后以字符串形式相加，最后得到一个八位的二进制数的字符串
    for(let j=0;j<status2.length;j++){
        
        if(status2[j]==true){
            status2[j]=1;
        }else {
            status2[j]=0;
        }

    }

    operat=[
        $("#male1").is(":checked"),
        $("#male2").is(":checked"),      
        $("#male3").is(":checked"),                 
    ]
    for(let j=0;j<operat.length;j++){
        if(operat[j]==true){
            operat[j]=1;
        }else {
            operat[j]=0;
        }
    }

    console.log("operat:"+operat);

    //更改input文本框的值，选中为1，没选择为0
    if(operat[0]==1){
        document.getElementById("i5").value=1;
    }else{
        document.getElementById("i5").value=0;
    }
    if(operat[1]==1){
        document.getElementById("i4").value=1;
    }else {
        document.getElementById("i4").value=0;
    }
    if(operat[2]==1){
        document.getElementById("i3").value=1;
    }else {
        document.getElementById("i3").value=0;
    }
    
    
})    

//对负数的处理，负数以补码运算
function isNegative(){
    console.log("最初:"+status1);
    let i=1;
    //对输入1的处理
    if(status1[0]==1){
        
        //取反
        for(i=1;i<status1.length;i++){

            if(status1[i]==0){
                status1[i]=1;
            }else if(status1[i]==1){
                status1[i]=0;
            }
        }
        //console.log("取反:"+status1);
        //+1
        let newNum;
        carry=[0,0,0,0,0,0,0,0];

        if(status1[7]==1){
            status1[7]=0;
            carry[6]=1;
        
            let j=0;
            for(j=6;j>=0;j--){
                if(carry[j]+status1[j]==1){
                    carry[j]=0;
                    status1[j]=1;
                }else if(carry[j]+status1[j]==2){
                    carry[j]=1;
                    status1[j]=0;                        
                }
            }
        }else {
            status1[7]=1;
        }
        //console.log(status1);
    }
    console.log("之后:"+status1);

    //对输入2的处理
    if(status2[0]==1){
        console.log("最初:"+status2);
        let i=1;
        //取反
        for(i=1;i<status2.length;i++){
            if(status2[i]==0){
                status2[i]=1;
            }else if(status2[i]==1){
                status2[i]=0;
            }
        }
        console.log("取反:"+status2);
        //+1
        let newNum;
        carry=[0,0,0,0,0,0,0,0];
        if(status2[7]==1){
            status2[7]=0;
            carry[6]=1;
        
            let j=0;
            for(j=6;j>=0;j--){
                if(carry[j]+status2[j]==1){
                    carry[j]=0;
                    status1[j]=1;
                }else if(carry[j]+status2[j]==2){
                    carry[j]=1;
                    status2[j]=0;                        
                }
            }
        }else {
            status2[7]=1;
        }
        console.log(status2);
    }        
}


function numAdd() {
    
    let i=0;

    for(i=7;i>=0;i--){
        
        //对3个中有俩个为1的处理
        if(status1[i]+status2[i]+carry[i]==2){
            newNum[i]=0;
            carry[i-1]=1;
        
        //对3个全为1的处理
        }else if(status1[i]+status2[i]+carry[i]==3){
            newNum[i]=1;
            carry[i-1]=1;
            
        }else {
            newNum[i] = status1[i]+status2[i]+carry[i];
        }
        
    }
    console.log("carry"+carry);
    console.log(newNum);
   
}

function numSub(){
    if(status2[0]==1){
        status2[0]=0;
    }else{
        status2[0]=1;
    }

    isNegative();
    numAdd();
}

function trueValue(){
    //得到两个数的二进制形式
    let i=0;
    let sum1 ="";
    let sum2 ="";
    for(i=0;i<status1.length;i++){
        sum1 = sum1+status1[i];
    }
    console.log(sum1);
    for(i=0;i<status2.length;i++){
        sum2 = sum2+status2[i];
    }
    console.log(sum2);

    num1=parseInt(sum1);
    num2=parseInt(sum2);

}

function muldify(){
    trueValue();
    
    mulNum = num1*num2;
    console.log(mulNum);
    newNum=[
        parseInt(mulNum/10000000%10),
        parseInt(mulNum/1000000%10),
        parseInt(mulNum/100000%10),
        parseInt(mulNum/10000%10),
        parseInt(mulNum/1000%10),
        parseInt(mulNum/100%10),
        parseInt(mulNum/10%10),
        parseInt(mulNum%10), 
    ]
    console.log(newNum);
}


function or(){
    let i;
    for(i=0;i<newNum.length;i++){
        newNum[i]=status1[i]||status2[i];
    }
    console.log(newNum);
} 


function and(){
    let i;
    for(i=0;i<newNum.length;i++){
        newNum[i]=status1[i]&&status2[i];
    }
    console.log(newNum);
} 

function andReverse(){
    let i;
    for(i=0;i<newNum.length;i++){
        newNum[i]=status1[i]&&status2[i];
        if(newNum[i]==0){
            newNum[i]=1;
        }else if(newNum[i]==1){
            newNum[i]=0;
        }
    }
    
}

function xor(){
    let i;
    for(i=0;i<newNum.length;i++){
        newNum[i]=status1[i]^status2[i];
        
    }   
    console.log(newNum);     
}

function xorReverse(){
    let i;
    for(i=0;i<newNum.length;i++){
        newNum[i]=status1[i]^status2[i];
        if(newNum[i]==0){
            newNum[i]=1;
        }else if(newNum[i]==1){
            newNum[i]=0;
        }
        
    }   
    console.log(newNum);     
      
}

function carryRst(){
    console.log("carry:"+carry);
    
        if(carry[0]==1){
            document.getElementById("c7").value=1;
        }
        if(carry[1]==1){
            document.getElementById("c6").value=1;
        }
        if(carry[2]==1){
            document.getElementById("c5").value=1;
        }
        if(carry[3]==1){
            document.getElementById("c4").value=1;
        }
        if(carry[4]==1){
            document.getElementById("c3").value=1;
        }
        if(carry[5]==1){
            document.getElementById("c2").value=1;
        }
        if(carry[6]==1){
            document.getElementById("c1").value=1;
        }
        if(carry[7]==1){
            document.getElementById("c0").value=1;
        }
    
}



function out(){
    
    
    if(newNum[0]==1){
        $(".light0").addClass("green");
    }
    if(newNum[1]==1){
        $(".light1").addClass("green");
    }
    if(newNum[2]==1){
        $(".light2").addClass("green");
    }
    if(newNum[3]==1){
        $(".light3").addClass("green");
    }
    if(newNum[4]==1){
        $(".light4").addClass("green");
    }
    if(newNum[5]==1){
        $(".light5").addClass("green");
    }
    if(newNum[6]==1){
        $(".light6").addClass("green");
    }
    if(newNum[7]==1){
        $(".light7").addClass("green");
    }
    
    
}

function result(){
    //判断功能键的状态，根据功能键状态来计算结果
    //功能1：加法
    if(operat[0]==0&&operat[1]==0&&operat[2]==0){
        numAdd();
        change();
        carryRst();
        out();
    }
    //功能2：减法
    if(operat[0]==0&&operat[1]==0&&operat[2]==1){
        numSub();
        change();
        carryRst();
        out();
    }
    //功能3：乘法
    if(operat[0]==0&&operat[1]==1&&operat[2]==0){
        muldify();
        change();
        carryRst();
        out();
    }
    //功能4:逻辑或
    if(operat[0]==0&&operat[1]==1&&operat[2]==1){
        or();
        change();
        out();
    }
    //功能5：逻辑与
    if(operat[1]==0&&operat[0]==1&&operat[2]==0){
        and();
        change();
        out();
    }  
    //功能6：逻辑与取反
    if(operat[1]==0&&operat[0]==1&&operat[2]==1){
        andReverse();
        change();
        out();
    }
    //功能7：异或
    if(operat[1]==1&&operat[1]==1&&operat[2]==0){
        xor();
        change();
        out();
    } 
    //功能8：同或     
    if(operat[1]==1&&operat[1]==1&&operat[2]==1){
        xorReverse();
        change();
        out();
    }                
}

    //寄存器部分
    function change(){
    //IR寄存器部分
    let i;
    let tmp = "";
    for(i=0;i<operat.length;i++){
        tmp = tmp +operat[i];
        
    }
    document.getElementById("ir").value=tmp;

    //ACC寄存器部分
    let tmpAcc="";
    //console.log("newNum"+newNum);
    for(let j=0;j<newNum.length;j++){
        tmpAcc = tmpAcc + newNum[j];
    }
    console.log("tmpAcc:"+tmpAcc);
    document.getElementById("acc").value=tmpAcc;
    //正负
    if(newNum[0]==1){
        document.getElementById("symbol").value="Negative";
    }
    //溢出
    //加法溢出
    if(status1[0]==0&&status2[0]==0&&newNum[0]==1){
        document.getElementById("isCarry").value="Yes";
    }
    if(status1[0]==1&&status2[0]==1&&newNum[0]==0){
        document.getElementById("isCarry").value="Yes";
    }
    //乘法溢出
    if(mulNum>11111111){
        document.getElementById("isCarry").value="Yes";
    }
}