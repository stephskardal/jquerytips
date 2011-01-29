$(function() {
	var collection = $(document.createElement('div'));	
	for(var i=0; i<products.length; i++) {
		var link = $(document.createElement('a'))
			.attr('href', '#')
			.html('<img class="product" src="/images/' + products[i].image + '" />')
			.data('name', products[i].name)
			.data('price', products[i].price);
		if(products[i].featured) {
			link.addClass('featured');
		} 
		if(products[i].sale) {
			link.addClass('sale');
		} 
		collection.append(link);
	}
	$('div#products').append(collection);

	var featured_product = $('div#featured_product');
	$('div#products a').click(function(e) {
		var product = $(this);
		featured_product
			.html('<h1>' + product.data('name') + ': $' + product.data('price').toFixed(2) + '</h1>')
			.append(product.find('img').clone());
		return false;
	});

	var all_products = $('div#products a');
	var featured_products = $('a.featured');
	var sale_products = $('a.sale');
	$('a#featured').click(function() {
		all_products.unhighlight_product();
		featured_products.highlight_product();
	});	
	$('a#sale').click(function() {
		all_products.unhighlight_product();
		sale_products.highlight_product();
	});	

	$('a#special').click(function() {
		$('div#products')
			.find('a')
				.css('background', '#FFF')
			.end()
			.find('.featured')
				.css('background', '#999')
			.end()
			.find('.sale')
				.css('background', '#999');
	});

	$('a#under20').click(function() {
		all_products.unhighlight_product();
		$('div#products a:under20').highlight_product();
	});
	$('a#over1000').click(function() {
		all_products.unhighlight_product();
		$('div#products a:over1000').highlight_product();
	});
	$('div#nav a').click(function() {
		$('div#nav a').not(this).unhighlight_product();	
		$(this).highlight_product();
	});
});

$.fn.unhighlight_product = function() {  
	return $(this).css('background', '#FFF');  
} 
$.fn.highlight_product = function() {
	return $(this).css('background', '#999');
}

$.extend($.expr[':'], {  
	under20: function(a) {
		if($(a).data('price') && $(a).data('price') < 20) {
			return true;
		}
		return false;
	}, 
	over1000: function(a) {
		if($(a).data('price') && $(a).data('price') > 1000) {
			return true;
		}
		return false;
	}  
});    
