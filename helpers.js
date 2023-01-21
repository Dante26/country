export const populationFormat = (num) =>{
    return new Intl.NumberFormat().format(num);
}

export const hasCapital = (city) =>{
    if(city === undefined){
        return `None`;
    }
    else{
        return city;
    }
}
