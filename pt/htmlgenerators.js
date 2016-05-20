/*****************************************
 *                                       *
 *   HTML Generators for barISTa 2013    *
 *                                       *
 *****************************************/
 
/*
 * suggestionHTMLGenerator ( name,  price, id )
 *
 * Returns a suggestion HTML with the specified
 * name, price and id
 *
 */

function suggestionHTMLGenerator ( name, price, id ) {
    
    var buttonRequest = '<img src="../images/pedir.png" width="75" height="75" class="request" onClick=\"incrClicks(); order(\'' + name + "\', \'" + price + "\')\" />"; 
    var buttonIgnore = '<img src="../images/ignorar.png" width="75" height="75" class="ignore" onClick="incrClicks(); ignore(' + s_id + ')" />';
    
    var text = '<div class="item" id="' + s_id +'">';
    
        text += '<div class="suggestion-text-container" >';
        
            text += '<div class="left">';
                text += '<p>' + name + '</p>';
                text += '<p>' + price + '€</p>';
            text += '</div>';
            
            text += '<div class="right">';
                text += '<p>Sugerido</p><p class="number-suggestions-text"><span id="suggestion-number-' + s_id + '">1</span> vez(es)</p>';
            text += '</div>';
        
        text += '</div>';
        
        text += '<div class="suggestion-button-container">';
    
            text += buttonRequest;
            text += buttonIgnore;
    
        text += '</div>';
    
    text += '</div>';
            
    return text;
    
}

/*
 * orderHTMLGenerator ( name, price )
 *
 * Returns a order HTML with the specified
 * name and price
 *
 */

function orderHTMLGenerator( name, price ) {
    
	var buttonRequest = '<img src="../images/confirmar.png" width="100" height="100" class="confirm" onClick="incrClicks(); confirmOrder()" />';
    var buttonIgnore = '<img src="../images/cancelar.png" width="100" height="100" class="cancel" onClick="incrClicks(); cancelOrder()" />';
    
    var text = '<div class="o_item" id="' + name + '">';
    
        text += '<div class="order-menu-container">';
    
            text += '<div class="title">Pedido</div>';
        
            text += '<div>';
                text += '<p id="order-name">' + name + '</p>';
                text += '<p id="order-price"><span id="order-literal-price">' + price + '</span>€</p><br/>';
                text += '<p>Quantidade</p>';
            text += '</div>';
			
            text += '<table>';
                text += '<tr>';
                    text += '<th class="minus"> <img width="75" height="75" src=\"../images/dec.png\" onClick=\"incrClicks(); decOrder()\" /> </th>';
                    text += '<th> <div style="font-size: 72px;" id="order-quantity">1</div> </th>';
                    text += '<th class="plus"> <img width="75" height="75" src=\"../images/inc.png\" onClick=\"incrClicks(); incOrder()\" /> </th>';
                text += '</tr>';
            text += '</table>';
        
        text += '</div>';
        
        text += '<div class="order-button-container">';
    
            text += buttonRequest;
            text += buttonIgnore;
    
        text += '</div>';
    
    text += '</div>';
            
    return text;
    
};

/*
 * checkoutItemHTMLGenerator ( name, price )
 *
 * Returns a item from the checkout HTML with the specified
 * name, price and quantity
 *
 */

function checkoutItemHTMLGenerator ( name, price, quantity, checkout_id ) {
    
    var combinedPrice = (price * quantity).toFixed(2);
    
    var text = '<div id="checkout-item-container-' + checkout_id + '" class="checkout-item-container" >';
        
        if (quantity == 1) {
    
            text += '<table class="unique-item">';
                text += '<tr>';
                    text += '<th class="name">' + name + '</th>'; 
                    text += '<th class="price">' + price + '€</th>';
                text += '</tr>';
            text += '</table>';
            
        } else {
            
            text += '<div class="name">' + name + '</div>'; 
            text += '<table class="various-items">';
                text += '<tr>';
                    text += '<th class="quantity"><span id="' + name + '-quantity">' + quantity + '</span>x</th>';
                    text += '<th class="pricePerUnit">' + price + '€</th>';
                    text += '<th class="combinedPrice">' + combinedPrice + '€</th>';
                text += '</tr>';
            text += '</table>';
            
        }
    
    text += '</div>';
            
    return text;
    
}

/*
 * helpTextHTMLGenerator ( name )
 *
 * Returns a <p> with the HTML correspondent to the
 * given name
 *
 */

function helpTextHTMLGenerator ( name ) {

    if(name == "ba") {
        
        return "<div class=\"text-one\"><p>Este é o menu de bedidas alcoólicas, aqui pode pedir bebidas para si ou para os seus amigos clicando em pedir. Poderá também, no entanto sugerir uma bebida clicando em sugerir.</p></div>";
        
    } else if (name == "bna") {
    
        return "<div class=\"text-one\"><p>Este é o menu de bedidas não alcoólicas, aqui pode pedir bebidas para si ou para os seus amigos clicando em pedir. Poderá também, no entanto sugerir uma bebida clicando em sugerir.</p></div>";
    
    } else if (name == "food") {
        
        return "<p><div class=\"text-one\">Este é o menu de snacks, aqui pode pedir snacks para si ou para os seus amigos clicando em pedir. Poderá também, no entanto sugerir um snack clicando em sugerir.</p></div>";
    
    } else if (name == "paint") {
    
        return "<div class=\"text-two\"><p>Acrescente um toque pessoal à mesa desenhando nesta. Para seleccionar uma cor use a paleta de cores que se encontra no canto inferior esquerdo e depois é só desenhar dentro do espaço disponibilizado. Se ficar satisfeito com o seu trabalho basta clicar em 'Guardar' e o seu fundo fica personalizado. Caso contrário poderá limpar a mesa no botão de 'Limpar'.</p></div>";
        
    } else if (name == "snooker") {
    
        return "<div class=\"text-one\"><p>Neste menu pode divertir-se sozinho ou com um amigo, basta apenas escolher se quer jogar em janela ou em ecran inteiro e o número de jogadores. Após escolher as hipóteses pretendidas seleccione 'Iniciar' e o seu jogo começará.</p></div>";
        
    } else {
        
        var content = "";
        
        content += "<table>";
            content += "<tr>";
                content += "<th><img class=\"help-icons\" src=\"../images/ba.png\" /></th>";
                content += "<th><p>Menu de bebidas alcoólicas</p></th>";
            content += "</tr>";
        
            content += "<tr>";
                content += "<th><img class=\"help-icons\" src=\"../images/bna.png\" /></th>";
                content += "<th><p>Menu de bebidas não alcoólicas</p></th>";
            content += "</tr>";
        
            content += "<tr>";
                content += "<th><img class=\"help-icons\" src=\"../images/food.png\" /></th>";
                content += "<th><p>Menu de snacks</p></th>";
            content += "</tr>";
        
            content += "<tr>";
                content += "<th><img class=\"help-icons\" src=\"../images/paint.png\" /></th>";
                content += "<th><p>Personalização do Fundo</p></th>";
            content += "</tr>";
        
            content += "<tr>";
                content += "<th><img class=\"help-icons\" src=\"../images/snooker.png\" /></th>";
                content += "<th><p>Snooker</p></th>";
            content += "</tr>";
        content += "</table>";
        
        return content;
    
    }

}