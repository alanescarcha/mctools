var username_regex = /^[a-zA-Z0-9_]{3,16}$/;
var obfuscated_animation_request_id = -1;

$.fn.selectRange = function(start, end){
	if(!end) end = start;
	return this.each(function(){
		if (this.setSelectionRange) {
			this.focus();
			this.setSelectionRange(start, end);
		} else if (this.createTextRange) {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', end);
			range.moveStart('character', start);
			range.select();
		}
	});
};


$(function(){
	'use strict';

	var motd_raw = $('#motd-raw');

	$('#motd_center').click(function(e){
		update_motd();
	});

	motd_raw.keyup(function(e){
		update_motd();
	});

	motd_raw.keydown(function(e){
		if(e.keyCode == 13 && $(this).val().split("\n").length >= $(this).attr('rows'))
			return false;
	});

	$('#motd-toolbar button').click(function(e){
		var caretPos = motd_raw[0].selectionStart;
		var textAreaTxt = motd_raw.val();
		var txtToAdd = '&' + $(this).data('color');

		motd_raw.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos)).focus();
		update_motd();
		motd_raw.selectRange(caretPos + 2);
	});

	$('#motd-toolbar button').tooltip({
		container: 'body'
	});


	animate_obfuscated_text();
});

function update_motd() {
	var form = $('#motd').serialize();

	$.post('https://api-corsbypass.herokuapp.com/https://mctools.org/motd-creator/json', form, function(motd){
		$('#motd-preview').html(motd['html']);
		$('#motd-config').val(motd['config']);
		$('#motd-bungeecord').val(motd['bungeecord']);
		$('#motd-serverlistplus').val(motd['serverlistplus']);
		$('#motd-link').val(motd['link']);

		window.cancelAnimationFrame(obfuscated_animation_request_id);
		animate_obfuscated_text();
	});
}

function animate_obfuscated_text() {
	obfuscated_animation_request_id = window.requestAnimationFrame(animate_obfuscated_text);

	$('.minecraft-formatted--obfuscated').each(function(){
		var random_string = '';

		for (var x = 0; x < this.innerHTML.length; x++)
			random_string += String.fromCharCode(Math.floor(Math.random() * (95 - 64 + 1)) + 64);

		this.innerHTML = random_string;
	});
}
