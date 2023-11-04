export const bmiCalculator = (height:number, weight:number):number =>{
    return Number((weight / (height * height)).toFixed(1) )
}

export const bmrCalculator = (sex:string = 'M', age:number, weight:number,height:number):number => {
    if(sex === "M"){
        return Number((66.47 + ( 13.75 * weight ) + ( 5.003 * height ) - ( 6.755 * age )).toFixed(0))
    }
    return Number((655.1 + ( 9.563 * weight ) + ( 1.85 * height ) - ( 4.676 * age )).toFixed(0))
}