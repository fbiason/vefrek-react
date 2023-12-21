import { Button, Card } from "keep-react";
import { Bed, Heart, MapPinLine } from "phosphor-react";

export const CardNegocio = (props) => {
  return (
    <>
      <Card
        className="max-w-xs overflow-hidden rounded-md"
        imgSrc={props.imagen}
        imgSize="md"
      >
        <Card.Container className="absolute right-3.5 top-3.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-metal-50/50">
          <Heart size={20} weight="bold" color="white" />
        </Card.Container>
        <Card.Container className="space-y-4 p-6">
          <Card.Title className="flex items-center gap-2 text-body-5 font-medium text-metal-500 md:!text-body-4">
            <MapPinLine size={20} color="#5E718D" />
            <span>Direccion: {props.direccion}</span>
          </Card.Title>
          <Card.Container className="flex items-center justify-between">
            <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
              <Bed size={20} color="#5E718D" />
              <span>Teléfono: {props.telefono}</span>
            </Card.Title>
          </Card.Container>
          <Card.Container className="flex items-center justify-between"></Card.Container>
          <Card.Container className="my-3 flex items-center justify-between">
            <Button type="primary" size="sm">
              Más info
            </Button>
          </Card.Container>
        </Card.Container>
      </Card>
    </>
  );
};
