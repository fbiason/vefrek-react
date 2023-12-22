import React from "react";
import "./categorias.css";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

const Categorias = () => {
  return (
    <section className="background">
      <Card isFooterBlurred className="h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            Compra Venta de Vehículos
          </p>
          <h4 className="font-medium text-xl">Biason Automotores</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="/images/portfolio/biasonautomotores.jpeg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="/images/portfolio/biasonautomotores.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">
                Dirección: Rivadavia 1.333
              </p>
              <p className="text-tiny text-white/60">Teléfono: 2966 449951</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Más info
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Categorias;
