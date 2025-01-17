import "./style.css";

interface Reserva {
    tipoHabitacion: "standard" | "suite";
    pax: number;
    noches: number;
};
  
const reservas:Reserva[] = [
    {
      tipoHabitacion: "standard",
      pax: 1,
      noches: 3,
    },
    {
      tipoHabitacion: "standard",
      pax: 1,
      noches: 4,
    },
    {
      tipoHabitacion: "suite",
      pax: 2,
      noches: 1,
    },
];

class TotalesReserva {
  listaReservas: Reserva[];
  habitacionStandar: number;
  habitacionSuite: number;
  personaAdicional: number;
  iva: number = 1.21;
  subTotal: number;
  total: number;

    constructor(listadoReservas: Reserva[]) {
      this.listaReservas = listadoReservas;
      this.habitacionStandar = 100;
      this.habitacionSuite = 150;
      this.personaAdicional = 40;
      this.subTotal = 0;
      this.total = 0;
    };
    
    calculaTotales(){
      this.listaReservas.forEach((reserva: Reserva) => {
        if(reserva.tipoHabitacion==="standard"){
          if(reserva.pax<=1){
            this.subTotal+=reserva.noches*(this.habitacionStandar);
          }else{
            this.subTotal+=reserva.noches*(this.habitacionStandar+(this.personaAdicional*(reserva.pax-1)));
          }
        }else{
          if(reserva.pax<=1){
            this.subTotal+=reserva.noches*(this.habitacionSuite);
          }else{
            this.subTotal+=reserva.noches*(this.habitacionSuite+(this.personaAdicional*(reserva.pax-1)));
          }
        }
      });
      this.total = Math.round((this.subTotal*this.iva)*100)/100;
    };

};

const totales = new TotalesReserva(reservas);
totales.calculaTotales();
console.log("Calculo totales cliente particular");
console.log("SubTotal: ", totales.subTotal);
console.log("Total: ", totales.total);

class CalculoTourOperador extends TotalesReserva {
  descuento: number;
  habitacionTour: number;
    constructor(listadoReservas: Reserva[]){
      super(listadoReservas);
      this.descuento = 0.85;
      this.habitacionTour = 100;
    };

    calculaTotales() {
      this.listaReservas.forEach((reserva: Reserva) => {
          if(reserva.pax<=1){
            this.subTotal+=reserva.noches*(this.habitacionTour);
          }else{
            this.subTotal+=reserva.noches*(this.habitacionTour+(this.personaAdicional*(reserva.pax-1)));
          }
        });
        this.subTotal = Math.round((this.subTotal*this.descuento)*100)/100;
        this.total = Math.round((this.subTotal*this.iva)*100)/100;
      };
};

const totalesTour = new CalculoTourOperador(reservas);
totalesTour.calculaTotales();
console.log("Calculo totales tour operador");
console.log("SubTotal: ", totalesTour.subTotal);
console.log("Total: ", totalesTour.total);

