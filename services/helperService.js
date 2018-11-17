module.exports = {

    taxMultiplierForPrice: function(tax){
    	return (1 + tax/100);
    },

    taxMultiplierForTax: function(tax){
    	return (tax/100);
    },
};
