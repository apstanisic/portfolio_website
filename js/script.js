// Prikazuje i skriva navigaciju
var navigacija = (function(){

    var nav = document.querySelector('.nav-linkovi');
    var dugme = document.querySelector('.nav-dugme');

    function prikaziNavigaciju(event) {
        nav.classList.toggle('prikazi-nav');
        this.classList.toggle('pomeri-nav-dugme');
    }

    dugme.addEventListener('click', prikaziNavigaciju);
})();
// Vrsi validacuju kontakt forme, i daje saopstava korisniku
var kontaktForma = (function(){
    var regex = {
        email : new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/, "i"),
        name : new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "u"),
        sadrzaj: new RegExp(/^.{5,}$/)
    };
    var forma = document.querySelectorAll('#contact-form input, #contact-form textarea');
    var dugme = document.querySelector('#dugme-submit');
    //Funkcije
    // Proverava polje iz forme, sa regexom istog imena iz var rerex-a, vraca true, ako ispunjava uslov
    function _proveriPolje(polje){
        let naziv = polje.getAttribute("name");
        let uslov = regex[naziv];
        let valja = uslov.test(polje.value);
        return valja;
    }
    /// FUNKCIJA init NE RADI!!!!!!!!!!!!!!!!!!!!!!!!!! JOS UVEK FIXME TODO FIXME
    function init(event){
        obojiPolje(event);
        proveriFormu(event);
        ///Napraviti da ovo radi, nece da prosledjuje this koji mi treba, valjda prosledjuje event?????
    }
    // Proverava svako tekstualno polje u formi, dodaje animaciju dugmetu ako radi
    function proveriFormu(event){
        for (var i = 0; i < forma.length; i++) {
            let valja = _proveriPolje(forma[i]);
            if (!valja){
                dugme.style.animation = 'none';
                dugme.style.background = '#fff';
                dugme.style.color = '#333334';
                return;
                //Prekida funkciju cim regex ne valja
            }
        }
        // boji dugme u zeleno i dodaje animaciju
        dugme.style.animation = 'dugme-an 2000ms infinite';
        dugme.style.background = 'rgba(124, 187, 0, 1)';
        dugme.style.color = '#fff';
    }

    // Proverava samo polje na kom je doslo do eventa.
    // Kod bi bio lepsi kada bih mogao da pozovem ovu funkciju gore, ali ne znam lepo kad se sta prosledjuje TODO

    function obojiPolje(event) {
        try {
            let senka = {
                zelena : '0px 0px 10px 2px rgba(124, 187, 0, 0.8)',
                bela : '0px 0px 10px 2px rgba(255, 255, 255, 0.5)',
                crvena : '0px 0px 10px 2px rgba(234, 67, 53, 0.5)'
            }
            let valja = _proveriPolje(this);
            //Zasto ne moze var senka = this.style.boxShadow; ????????????? BUG

            // pozadina textboxa pozeleni kada se iskoristi autocomple ??? BUG ??? FIXME???
            if (event.type !== "blur") {
                if (valja) {
                    this.style.boxShadow = senka.zelena;
                } else {
                    this.style.boxShadow = senka.bela;
                }
            } else {
                if (!valja) {
                    this.style.boxShadow = senka.crvena;
                }
            }
        } catch (e) {
           console.log("Ubaci regex");
            // treba da dodje za koje polje TODO
             //Bacice gresku ako nema regex sa istim imenom kao name polja, ili ga uopste nema
        }
    }

//Ovo je najruznije i najvaznije. Proslediti prave parametre u funkciju, tako da this radi...
// TODO TODO TODO TODO TODO TODO
    for (var i = 0; i < forma.length; i++) {
        forma[i].addEventListener('input', obojiPolje);
        forma[i].addEventListener('focus', obojiPolje);
        forma[i].addEventListener('blur', obojiPolje);
        forma[i].addEventListener('input', proveriFormu);
        forma[i].addEventListener('focus', proveriFormu);
        forma[i].addEventListener('blur', proveriFormu);
    }
})();
