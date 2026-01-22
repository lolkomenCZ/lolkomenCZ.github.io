let zdravi = 100;
let penize = 600;
let jmenoHrace = "Neznámý";
let hraBezi = false;

const uiJmeno = document.getElementById("zobrazeni-jmena");
const uiPenize = document.getElementById("zobrazeni-penez");
const uiHpLista = document.getElementById("hp-lista-plna");
const uiHpText = document.getElementById("hp-text-cislo");
const nadpisElement = document.getElementById("nadpis-sceny");
const obsahElement = document.getElementById("obsah-pribehu");
const zpetnaVazbaElement = document.getElementById("oblast-zpetne-vazby");
const volbyElement = document.getElementById("oblast-voleb");
const herniOknoElement = document.getElementById("herni-okno");
const obrazekSceny = document.getElementById("obrazek-sceny");

function aktualizovatUI() {
    uiJmeno.innerText = jmenoHrace;
    uiPenize.innerText = penize;
    uiHpText.innerText = Math.round(zdravi) + " / 100"; 
    uiHpLista.style.width = zdravi + "%";

    if (zdravi > 50) {
        uiHpLista.style.backgroundColor = "#27ae60";
    } else if (zdravi > 25) {
        uiHpLista.style.backgroundColor = "#f39c12";
    } else {
        uiHpLista.style.backgroundColor = "#c0392b";
    }
}

function aktualizovatStav(zmenaZdravi, zmenaPenez, zprava) {
    zdravi += zmenaZdravi;
    penize += zmenaPenez;

    if (zdravi > 100) zdravi = 100;
    if (penize < 0) penize = 0;

    if (zmenaZdravi < 0) {
        zpetnaVazbaElement.style.color = "#c0392b";
    } else if (zmenaZdravi > 0) {
        zpetnaVazbaElement.style.color = "#27ae60";
    } else {
        zpetnaVazbaElement.style.color = "#f1c40f";
    }

    if (zdravi <= 0) {
        zdravi = 0;
        aktualizovatUI();
        ukoncitHru("smrt");
        return;
    }

    zpetnaVazbaElement.innerText = zprava;
    aktualizovatUI();
}

function pridatTlacitko(text, typ, akce) {
    const tlacitko = document.createElement("button");
    tlacitko.innerText = text;
    if (typ) tlacitko.classList.add(typ);
    tlacitko.onclick = akce;
    volbyElement.appendChild(tlacitko);
}

function nastavitObrazekSceny(nazevObrazku) {
    obrazekSceny.src = nazevObrazku; 
}

function spustitHru() {
    let vstup = prompt("Jak se jmenuješ, rváči?");
    if (vstup && vstup.trim() !== "") jmenoHrace = vstup;
    else jmenoHrace = "Nocležník";

    zdravi = 100;
    penize = 600;
    hraBezi = true;
    aktualizovatUI();
    nacistScenu(1);
}

function nacistScenu(idSceny) {
    if (!hraBezi) return;

    volbyElement.innerHTML = "";
    zpetnaVazbaElement.innerText = "";

    switch (idSceny) {
        case 1:
            nastavitObrazekSceny("obrazky/hospoda.jpg"); 
            nadpisElement.innerText = "Dilema v Hospodě";
            obsahElement.innerHTML = "Výčepní přinesl účet: <strong>300 Kč</strong>. Máš u sebe <strong>600 Kč</strong>.<br>Taxi domů stojí <strong>350 Kč</strong>. Pokud zaplatíš, nezbyde ti na taxi.";

            pridatTlacitko("Zaplatit (Čest)", "styl-bezpecne", () => {
                aktualizovatStav(0, -300, "Zaplaceno. Jsi chudší, ale čistý.");
                nacistScenu(2);
            });

            pridatTlacitko("Utéct bez placení (RISK)", "styl-risk", () => {
                if (Math.random() > 0.5) {
                    let facka = Math.floor(Math.random() * 15) + 10;
                    aktualizovatStav(-facka, 0, "Chytil tě vyhazovač! Dostal jsi facku.");
                } else {
                    aktualizovatStav(0, 0, "Utekl jsi jako duch. Prachy máš.");
                }
                nacistScenu(2);
            });
            break;

        case 2:
            if (Math.random() > 0.4) {
                nacistScenu(200); 
            } else {
                scenaBeznaUlice(); 
            }
            break;

        case 200: 
            nastavitObrazekSceny("obrazky/ulice_zima.jpg"); 
            nadpisElement.innerText = "Problém před hospodou";
            obsahElement.innerHTML = "Sotva jsi vyšel, vrazil do tebe agresivní štamgast. <em>'Co čumíš?!'</em> řve a napřahuje se.";
            
            pridatTlacitko("Dát mu dělo (Útok)", "styl-risk", () => {
                let poskozeni = Math.floor(Math.random() * 15) + 5;
                aktualizovatStav(-poskozeni, 0, "Dal jsi mu ránu a utekl, ale taky jsi jednu schytal.");
                if (hraBezi) scenaBeznaUlice();
            });
            
            pridatTlacitko("Zkusit ho obejít", "styl-bezpecne", () => {
                 let kopanec = Math.floor(Math.random() * 10) + 5;
                 aktualizovatStav(-kopanec, 0, "Kopl tě do zadku, když jsi procházel.");
                 if (hraBezi) scenaBeznaUlice();
            });
            break;

        case 3:
            nastavitObrazekSceny("obrazky/podchod.jpg");
            nadpisElement.innerText = "Podchod";
            obsahElement.innerHTML = "Došel jsi k podchodu pod železnicí. Fouká tam a je tam tma, ale je to zkratka.";

            pridatTlacitko("Projít rychle (Zima)", "", () => {
                let zima = Math.floor(Math.random() * 8) + 5;
                aktualizovatStav(-zima, 0, "Mrazivý vítr ti profoukl kosti.");
                if (hraBezi) nacistScenu(4);
            });
            
            pridatTlacitko("Prozkoumat stíny (Risk)", "styl-risk", () => {
                 if(Math.random() > 0.5) {
                    nacistScenu(300); 
                 } else {
                    nacistScenu(30); 
                 }
            });
            break;

        case 300:
             nastavitObrazekSceny("obrazky/pes.jpg");
             nadpisElement.innerText = "Toulavý pes";
             obsahElement.innerHTML = "Z temnoty vyběhl vzteklý pes a zakousl se ti do nohavice!";
             
             pridatTlacitko("Kopnout a utéct", "styl-risk", () => {
                 let kousnuti = Math.floor(Math.random() * 10) + 10;
                 aktualizovatStav(-kousnuti, 0, "Pes tě kousl do nohy, ale utekl jsi.");
                 if (hraBezi) nacistScenu(4);
             });
             break;

        case 30:
            nastavitObrazekSceny("obrazky/bezdomovec.jpg");
            nadpisElement.innerText = "Setkání v podchodu";
            obsahElement.innerHTML = "Zatarasil ti cestu bezdomovec. <em>'Dej mi prachy na jídlo!'</em>";

            pridatTlacitko("Nedat mu nic (Bitka)", "styl-risk", () => {
                nacistScenu(31);
            });

            pridatTlacitko("Dát mu peníze", "styl-bezpecne", () => {
                let castka = prompt("Kolik Kč mu dáš?");
                let hodnota = parseInt(castka);

                if (isNaN(hodnota) || hodnota <= 0) { alert("To nejsou peníze."); return; }
                if (hodnota > penize) { alert("Tolik nemáš!"); return; }

                if (hodnota <= 10) {
                    aktualizovatStav(0, -hodnota, "Dal jsi mu drobné.");
                    if (!hraBezi) return;

                    nadpisElement.innerText = "To je málo!";
                    obsahElement.innerHTML = "<em>'Děláš si srandu? Jenom tolik?'</em> Vrhl se na tebe.";
                    volbyElement.innerHTML = ""; 
                    setTimeout(() => nacistScenu(31), 2500);
                } else {
                    aktualizovatStav(0, -hodnota, "Byl jsi štědrý.");
                    if (!hraBezi) return;

                    nadpisElement.innerText = "Vděk";
                    obsahElement.innerHTML = "<em>'Děkuji šéfe!'</em> Ustoupil.";
                    volbyElement.innerHTML = "";
                    setTimeout(() => nacistScenu(4), 2500);
                }
            });
            break;

        case 31:
            nastavitObrazekSceny("obrazky/bitka.jpg");
            let bitkaDmg = Math.floor(Math.random() * 20) + 15;
            aktualizovatStav(-bitkaDmg, 0, "Bezdomovec měl sílu! Dostal jsi nakládačku.");
            if (!hraBezi) return; 

            nadpisElement.innerText = "Rvačka";
            obsahElement.innerHTML = "Utrpěl jsi zranění, ale nakonec jsi se mu vytrhl a běžel dál.";
            pridatTlacitko("Utéct na náměstí", "styl-risk", () => nacistScenu(4));
            break;

        case 4:
            nastavitObrazekSceny("obrazky/namesti.jpg");
            nadpisElement.innerText = "Hlavní Náměstí";
            obsahElement.innerHTML = "Jsi v polovině. Vidíš stanoviště TAXI a stánek s Kebabem.";

            if(penize >= 350) {
                 pridatTlacitko("🚕 VIP Taxi domů (350 Kč)", "styl-vip", () => {
                    aktualizovatStav(0, -350, "Nasedl jsi do taxíku.");
                    ukoncitHru("taxi");
                });
            } else {
                 pridatTlacitko("🚕 Taxi (350 Kč) - NEMÁŠ DOST", "styl-risk", () => {
                    alert("Máš jen " + penize + " Kč. Smůla.");
                });
            }

            pridatTlacitko("Koupit Kebab (-90 Kč, +20 HP)", "styl-bezpecne", () => {
                if(penize >= 90) {
                    aktualizovatStav(20, -90, "Doplnil jsi síly.");
                    nacistScenu(5);
                } else {
                    alert("Nemáš na jídlo.");
                }
            });

            pridatTlacitko("Jít dál pěšky", "", () => {
                let unava = Math.floor(Math.random() * 6) + 3;
                aktualizovatStav(-unava, 0, "Nohy bolí, mráz štípe.");
                if (hraBezi) nacistScenu(5);
            });
            break;

        case 5:
            nastavitObrazekSceny("obrazky/park.jpg");
            nadpisElement.innerText = "Rozcestí u Parku";
            obsahElement.innerHTML = "Poslední úsek. Temný park nebo kolem policie?";

            pridatTlacitko("Temný park (Vysoké riziko bitky)", "styl-risk", () => {
                if (Math.random() > 0.6) {
                    aktualizovatStav(0, 0, "Zázrak, park byl prázdný.");
                    nacistScenu(6);
                } else {
                    nacistScenu(51);
                }
            });

            pridatTlacitko("Kolem policie (Risk pokuty)", "", () => {
                 if(Math.random() > 0.5) { 
                     nacistScenu(6);
                 } else {
                     if(penize >= 100) {
                         aktualizovatStav(0, -100, "Dostal jsi pokutu 100 Kč za rušení nočního klidu.");
                         if (hraBezi) {
                            nastavitObrazekSceny("obrazky/policie.jpg");
                            nacistScenu(6);
                         }
                     } else {
                         ukoncitHru("zatceni");
                     }
                 }
            });
            break;

        case 51:
             nastavitObrazekSceny("obrazky/bitka.jpg");
             nadpisElement.innerText = "Přepadení!";
             obsahElement.innerHTML = "Z křoví vyskočili dva chuligáni. Okamžitě útočí!";
             
             pridatTlacitko("Bránit se!", "styl-risk", () => {
                 let poskozeni = Math.floor(Math.random() * 25) + 15;
                 aktualizovatStav(-poskozeni, 0, "Byla to mela. Jsi hodně potlučený.");
                 if (hraBezi) nacistScenu(6);
             });
             
             pridatTlacitko("Dát jim prachy a utéct", "styl-bezpecne", () => {
                 aktualizovatStav(0, -Math.floor(penize/2), "Vzali ti půlku peněz, srabáku.");
                 nacistScenu(6);
             });
             break;

        case 6:
            nastavitObrazekSceny("obrazky/dvere.jpg");
            nadpisElement.innerText = "Konečně doma";
            obsahElement.innerHTML = "Stojíš před vchodem. Jsi promrzlý. Klíče máš v kapse.";

            pridatTlacitko("Odemknout", "styl-bezpecne", () => {
                if (zdravi > 20) {
                    aktualizovatStav(0, 0, "Trefil ses!");
                    ukoncitHru("vyhra");
                } else {
                    let zraneni = Math.floor(Math.random() * 10) + 5;
                    aktualizovatStav(-zraneni, 0, "Třesou se ti ruce, praštil ses o futra.");
                    if(zdravi > 0 && hraBezi) pridatTlacitko("Zkusit to znovu", "styl-risk", () => ukoncitHru("zazvonit"));
                }
            });

            pridatTlacitko("Vyrazit dveře ramenem", "styl-risk", () => {
                let rameno = Math.floor(Math.random() * 10) + 10;
                aktualizovatStav(-rameno, 0, "Dveře povolily, ale rameno máš v háji.");
                if(zdravi > 0 && hraBezi) ukoncitHru("vyhra");
            });
            break;
    }
}

function scenaBeznaUlice() {
    let mraz = Math.floor(Math.random() * 8) + 3;
    aktualizovatStav(-mraz, 0, "Mráz zalézá pod nehty.");
    if (!hraBezi) return;

    nastavitObrazekSceny("obrazky/ulice_zima.jpg");
    nadpisElement.innerText = "Mrazivá ulice";
    obsahElement.innerHTML = "Stojíš na chodníku. Je zima. Cesta domů bude dlouhá.";

    pridatTlacitko("Jít rychle po hlavní", "styl-bezpecne", () => {
        let unava = Math.floor(Math.random() * 4) + 2;
        aktualizovatStav(-unava, 0, "Jdeš svižně.");
        if (hraBezi) nacistScenu(3);
    });

    pridatTlacitko("Zkratka přes staveniště (Risk)", "styl-risk", () => {
        if(Math.random() > 0.6) { 
            let pad = Math.floor(Math.random() * 10) + 15;
            aktualizovatStav(-pad, 0, "Spadl jsi do výkopu! To bolelo.");
        } else {
            aktualizovatStav(0, 0, "Ušetřil jsi cestu, dobrá volba.");
        }
        if (hraBezi) nacistScenu(3);
    });
}

function ukoncitHru(typ) {
    hraBezi = false;
    volbyElement.innerHTML = "";

    switch (typ) {
        case "smrt":
            nastavitObrazekSceny("obrazky/gameover.jpg");
            nadpisElement.innerText = "KONEC HRY";
            nadpisElement.style.color = "#c0392b";
            obsahElement.innerHTML = "Omdlel jsi na ulici. Noc tě dostala.";
            break;
        case "taxi":
            nastavitObrazekSceny("obrazky/taxi.jpg");
            nadpisElement.innerText = "VIP VÍTĚZSTVÍ";
            nadpisElement.style.color = "#8e44ad";
            obsahElement.innerHTML = `Dojel jsi taxíkem. Jsi v teple.<br>Zbývající peníze: ${penize} Kč.`;
            break;
        case "vyhra":
            nastavitObrazekSceny("obrazky/vyhra.jpg");
            nadpisElement.innerText = "VÍTĚZSTVÍ";
            nadpisElement.style.color = "#27ae60";
            obsahElement.innerHTML = `Došel jsi pěšky!<br>HP: ${zdravi}, Peníze: ${penize} Kč.`;
            break;
        case "zazvonit":
            nastavitObrazekSceny("obrazky/policie.jpg");
            nadpisElement.innerText = "PROHRA - ZÁCHYTKA";
            nadpisElement.style.color = "#2980b9";
            obsahElement.innerHTML = "Sousedé zavolali policii, že děláš bordel.";
            break;
        case "zatceni":
            nastavitObrazekSceny("obrazky/vezeni.jpg");
            nadpisElement.innerText = "PROHRA - VĚZENÍ";
            nadpisElement.style.color = "#2c3e50";
            obsahElement.innerHTML = "Neměl jsi na pokutu. Noc strávíš v cele.";
            break;
    }

    pridatTlacitko("Hrát znovu", "tlacitko-start", () => location.reload());
}