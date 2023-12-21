import { Badge, Button, Card, PlayButton, Progress } from "keep-react";
import "./keep.css";
import {
  ArrowsOutSimple,
  Bed,
  Heart,
  MapPinLine,
  Play,
  Rows,
  ShoppingCart,
  Shower,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  Users,
} from "phosphor-react";

export const Keep = () => {
  return (
    <>
      <div className="keepCont">
        {/*=== PRODUCT CARD THREE === */}
        <Card
          className="max-w-xs overflow-hidden rounded-md"
          imgSrc="https://images.prismic.io/staticmania/56ae80e7-4d23-4bd9-a2f3-01bd6f923a8b_product-2.avif?auto=compress,format"
          imgSize="md"
        >
          <Card.Container className="absolute right-3.5 top-3.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-metal-50/50">
            <Heart size={20} weight="bold" color="white" />
          </Card.Container>
          <Card.Container className="space-y-4 p-6">
            <Card.Title className="flex items-center gap-2 text-body-5 font-medium text-metal-500 md:!text-body-4">
              <MapPinLine size={20} color="#5E718D" />
              <span>Garden Street,Ring Road</span>
            </Card.Title>
            <Card.Container className="flex items-center justify-between">
              <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
                <Bed size={20} color="#5E718D" />
                <span>3 Bed Room</span>
              </Card.Title>
              <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
                <Shower size={20} color="#5E718D" />
                <span>1 Bath</span>
              </Card.Title>
            </Card.Container>
            <Card.Container className="flex items-center justify-between">
              <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
                <ArrowsOutSimple size={20} color="#5E718D" />
                <span>1,032 sqft</span>
              </Card.Title>
              <Card.Title className="flex items-center gap-2 !text-body-5 font-medium text-metal-500">
                <Users size={20} color="#5E718D" />
                <span>Family</span>
              </Card.Title>
            </Card.Container>
            <Card.Container className="my-3 flex items-center justify-between">
              <Button type="primary" size="sm">
                Check Out
              </Button>
              <Card.Title className="text-body-3 font-medium text-metal-500">
                $649,00
              </Card.Title>
            </Card.Container>
          </Card.Container>
        </Card>
      </div>
    </>
  );
};
