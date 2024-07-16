const form = document.getElementById('mortgage-form');
const submitButton = document.getElementById('submit-button'); 
const clear = document.getElementById('clear');
const amount = document.getElementById('amount');
    const term = document.getElementById('term');
    const rate = document.getElementById('rate');
    const radios = document.querySelectorAll('input[type="radio"]');
    const amountError=document.getElementById('amount-error');
    const rateError=document.getElementById('rate-error');
    const termError=document.getElementById('term-error');
    const typetError=document.getElementById('type-error');
    const monthlyResult = document.getElementById('monthly-result');
    const total = document.getElementById('total');
    const resultEmpty =document.getElementById('results-empty');
    const resultComplete =document.getElementById('results');
    clear.addEventListener('click' ,function () {
    amount.value = '';
    term.value = '';
    rate.value = '';
    radios.forEach(radio =>{
        radio.checked=false;
    })
    resultEmpty.classList.remove('hidden');
    resultComplete.classList.add('hidden');
});
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    
    let isValid = true;
    //validation
    for(let i = 0; i <radios.length; i++){
        if(radios[i].checked){
            
            typetError.textContent='';
            isValid=true;
            break;
        }
        else{
            isValid=false;
            
            typetError.textContent='This field is reqiued';
            

        }
    }

    if(amount.value === '' || amount.value < 0 ){

        amountError.textContent = 'This field is reqiured';
        isValid = false;
    }
    else{
        amountError.textContent ='';
        
    }
    if(term.value === '' || term.value < 0){

        termError.textContent = 'This field is reqiured';
        isValid = false;
    }
    else{
        termError.textContent ='';
    }
    if(rate.value === '' || rate.value < 0){

        rateError.textContent = 'This field is reqiured';
        isValid = false;
        
    }
    else{
        rateError.textContent ='';
    }
    //mortgage calclu depending on type
    //repayment
    function repaymentType(){
        let p = parseFloat(amount.value);
        let r = parseFloat(rate.value) / 1200;
        let n = parseInt(term.value) * 12;
        let monthlyPay = (r * p * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        let termPay = monthlyPay*n;

        radios.forEach(radio => {
            if(radio.checked){
                
                if(radio.value === 'repayment'){
                    monthlyResult.textContent = '£' + monthlyPay.toFixed(2);
                    total.textContent ='£' + termPay.toFixed(2);
                    resultEmpty.classList.add('hidden');
                    resultComplete.classList.remove('hidden');
                
                }
                if(radio.value === 'intrest'){
                    monthlyPay = p * r;
                    termPay = monthlyPay * n;
                    monthlyResult.textContent = '£' + monthlyPay.toFixed(2);
                    total.textContent ='£' + termPay.toFixed(2);
                    resultEmpty.classList.add('hidden');
                    resultComplete.classList.remove('hidden');

                }
            }

           
            
        });
        

    }
    




    if(!isValid)
        return;
    
        
    
    else{
        repaymentType();
        
    }   



});

