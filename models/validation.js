class Validation{

    kiemTraRong(value,selectorError,name) {
        
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    kiemTraTatCaKyTu(value,selectorError,name) {
        var regexLetter = /^[A-Z a-z]+$/;
        if(value !=''){
            if(regexLetter.test(value)){//Chuỗi phù hợp định dạng
                document.querySelector(selectorError).innerHTML = '';
                return true;
            }
            document.querySelector(selectorError).innerHTML = name + ' không hợp lệ!';
            return false;
        }
    }

    kiemTraTatCaSo (value,selectorError,name)  {
        var regexNumber = /^[0-9]+$/;
        if(value !=''){
            if(regexNumber.test(value)) {
                document.querySelector(selectorError).innerHTML = '';
                return true;
            }
            document.querySelector(selectorError).innerHTML = name + ' phải nhập số!';
            return false;
        }
    }


    kiemTraEmail(value,selectorError,name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regexEmail.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
        return false;
    }

    kiemTraGiaTri(value,selectorError,minValue,maxValue,name) {
        if(value !=''){
            if(value <= minValue || value >= maxValue) {

                document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} - ${maxValue}`;
                return false;
            }
    
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
    }

        kiemTraDoDai(value,selectorError,minLength,maxLength,name) {
        if(value != ''){
            if(value.trim().length < minLength || value.trim().length > maxLength) {
                document.querySelector(selectorError).innerHTML = `${name} từ ${minLength} - ${maxLength}`;
                return false;
            }
            
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
    }

}