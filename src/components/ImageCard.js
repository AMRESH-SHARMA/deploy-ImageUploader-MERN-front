import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function Example(props) {
  return (

    <Card className="w-96 py-5 mt-10 hover:bg-[#581c87]">
      <CardHeader floated={false} className="h-65">
        <img 
        src={props.imgUrl} 
        alt="thumbnail" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="black" className="mb-2 ">
          {props.title}
        </Typography>
        <Typography variant="h4" color="black" className="mb-2 ">
          {props.createdAt.slice(0,10)}
        </Typography>
      </CardBody>
    </Card>
  );
}