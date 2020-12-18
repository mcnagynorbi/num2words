Number.toWords = function(number){
	var Strings = {};
	Strings.ones = ["","egy","kettő","három","négy","öt","hat","hét","nyolc","kilenc"];
	Strings.tens = ["","tizen","huszon","harminc","negyven","ötven","hatvan","hetven","nyolcvan","kilencven"];
	Strings.tens_int = ["","tíz","húsz","harminc","negyven","ötven","hatvan","hetven","nyolcvan","kilencven"];
	Strings.powers = ["","száz","ezer","millió","milliárd","billió","billiárd","trillió","trilliárd","kvadrillió","kvadrilliárd","kvintillió","kvintilliárd","szextillió","szextilliárd","szeptillió","szeptilliárd","oktillió","oktilliárd","nonillió","nonilliárd","decillió","decilliárd","undecillió","undecilliárd","duodecillió","duodecilliárd","tridecillió","tridecilliárd","kvadecillió","kvadecilliárd","kvintdecillió","kvintdecilliárd","szexdecillió","szexdecilliárd"];
	Strings.others = {error:"hiba",zero:"nulla",minus:"mínusz",delimiter:"-"};
	if(!number.toString().match(/^-?[0-9]+$/)){
		return Strings.others.error;
	}
	var convert = function(num, step){
		num = num.toString().replace(/^0+/,"");
		var spacer = (step>=1) ? Strings.others.delimiter : "";
		if(step>Strings.powers.length-1){
			return convert(num,step-1);
		} else
		if(step>=1){
			if (num.toString().length > step*3) {
				return convert(num.toString().substr(0,num.toString().length-step*3),step) + Strings.powers[step+1] + spacer + convert(num.toString().substr(num.toString().length-step*3),step-1);
			}
			else {
				return convert(num,step-1);
			}
		}
		else if(step==0) {
			if (num >= 100) {
				return Strings.ones[Math.floor(num/100)] + Strings.powers[step+1] + spacer + convert(num%100,step-1);
			}
			else {
				return convert(num,step-1);
			}
		}
		else if(step==-1) {
			if (num<10) {
				return Strings.ones[num];
			}
			else if (num%10 == 0) {
				return Strings.tens_int[Math.floor(num/10)];
			}
			else {
				return Strings.tens[Math.floor(num/10)] + spacer + Strings.ones[num%10];
			}
		}
	};
	function removeSuffix(str,chars){
		chars = chars.split("");
		for(n in chars){
			if(str.substr(-1,1)==chars[n]){
				str = str.substr(0,str.length-1);
			}
		}
		return str;
	}
	var minusPrefix = (number.toString().match(/^-/)) ? Strings.others.minus+" " : "";
	if(number.toString().match(/^-/)){
		number = number.substr(1);
	}
	try {
		return (number==0) ? Strings.others.zero : minusPrefix + removeSuffix(convert(number,Strings.powers.length),"- ");
	} catch(e) {
		return Strings.others.error;
	}
};
Number.prototype.toWords = function(){
	return Number.toWords(this.valueOf());
};
String.prototype.toWords = function(){
	return Number.toWords(this.valueOf());
};
