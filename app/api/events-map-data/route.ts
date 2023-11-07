import { NextResponse } from "next/server";
import { EventData } from "../../components/molecules/EventsGoogleMap/EventsGoogleMap";

export async function GET(req: Request) {
  const eventsData: Array<EventData> = [
    {
      name: "Salesforce Community Meetup",
      position: { lat: 49.81181722138225, lng: 24.038837281402685 },
      img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/Salesforce_Community_Meetup.png",
      city: "Lviv",
      date: "02 November (Thursday)",
      time: "19:00",
      price: "free",
    },
    {
      name: "Trainual <> Everlabs Hackathon 2023",
      position: { lat: 49.43106359131095, lng: 32.068750139051666 },
      img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/Trainual_Everlabs_Hackathon-2023.png",
      city: "Cherkasy",
      date: "04 November (Saturday)",
      time: "11:00",
      price: "Donate",
    },
    {
      name: "SKELAR Meetup: product edition",
      position: { lat: 50.47211972458061, lng: 30.503063408592315 },
      img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/SKELAR_Meetup_product_edition.png",
      city: "Kyiv",
      date: "09 November (Thursday)",
      time: "19:00",
      price: "donation for the Ukrainian Armed Forces — from 400 hryvnias",
    },
    {
      name: "Мітап Recruiting Dnipro Community #4",
      position: { lat: 48.45602403972232, lng: 35.05020569666684 },
      img: "https://raw.githubusercontent.com/timpriadko/nextjs-visitors-app-hw/gmap/public/assets/images/Recruiting_Dnipro_Community.png",
      city: "Dnipro",
      date: "23 November (Thursday)",
      time: "18:30",
      price: "300 hrn",
    },
  ];

  return NextResponse.json({ eventsData }, { status: 200 });
}
