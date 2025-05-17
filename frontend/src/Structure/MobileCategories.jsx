import React from 'react'
import { useState, useRef, useEffect } from "react";



import Abs_Wheel_Roller from "../assets/mobil_categorys/Abs Wheel Roller.webp";
import Adhesives_Tapes from "../assets/mobil_categorys/Adhesives & Tapes.webp";
import All_Baby_Care from "../assets/mobil_categorys/All Baby Care.webp";
import All_Bottomwear from "../assets/mobil_categorys/All Bottomwear.webp";
import All_Home_Decor from "../assets/mobil_categorys/All Home Decor.webp";
import All_Home_Essentials from "../assets/mobil_categorys/All Home Essentials.webp";
import All_Inner_Sleep_Wear from "../assets/mobil_categorys/All Inner & Sleep Wear.webp";
import All_Jewellery from "../assets/mobil_categorys/All Jewellery.webp";
import All_Kurta_Sets from "../assets/mobil_categorys/All Kurta Sets.webp";
import All_Kurtis from "../assets/mobil_categorys/All Kurtis.webp";
import All_Maternity_Feedingwear from "../assets/mobil_categorys/All Maternity & Feedingwear.webp";
import All_Men_Accessories from "../assets/mobil_categorys/All Men Accessories.webp";
import All_Musical_Instruments from "../assets/mobil_categorys/All Musical Instruments.webp";
import all_sarees from "../assets/mobil_categorys/all sarees.webp";
import All_Suits_Dress_Material from "../assets/mobil_categorys/All Suits & Dress Material.webp";
import All_Top_Wear from "../assets/mobil_categorys/All Top Wear.webp";
import All_Topwear from "../assets/mobil_categorys/All Topwear.webp";
import All_Women_Bags from "../assets/mobil_categorys/All Women Bags.webp";
import All_Women_Sportwear from "../assets/mobil_categorys/All Women Sportwear.webp";
import Anarkali_Kurtis from "../assets/mobil_categorys/Anarkali Kurtis.webp";
import Anklets from "../assets/mobil_categorys/Anklets.webp";
import Appliances_Covers from "../assets/mobil_categorys/Appliances Covers.webp";
import Appliances from "../assets/mobil_categorys/Appliances.webp";
import Baby_Bedding_Accessories from "../assets/mobil_categorys/Baby Bedding & Accessories.webp";
import Baby_Personal_Care from "../assets/mobil_categorys/Baby Personal Care.webp";
import Baby_Sets from "../assets/mobil_categorys/Baby Sets.webp";
import Backpacks from "../assets/mobil_categorys/Backpacks.webp";
import Bags_Backpacks from "../assets/mobil_categorys/Bags & Backpacks.webp";
import Bags from "../assets/mobil_categorys/Bags.webp";
import bags_footwear_Images_64 from "../assets/mobil_categorys/bags_footwear_Images_64.webp";
import Bakeware from "../assets/mobil_categorys/Bakeware.webp";
import banarasi_silk_sarees from "../assets/mobil_categorys/banarasi silk sarees.webp";
import Bandminton from "../assets/mobil_categorys/Bandminton.webp";
import Bangles from "../assets/mobil_categorys/Bangles.webp";
import Bath_Shower from "../assets/mobil_categorys/Bath & Shower.webp";
import Bathroom_Accessories from "../assets/mobil_categorys/Bathroom Accessories.webp";
import Beard_Care from "../assets/mobil_categorys/Beard Care.webp";
import beauty_health_images_64 from "../assets/mobil_categorys/beauty_health_images_64.webp";
import Bedsheets from "../assets/mobil_categorys/Bedsheets.webp";
import Bellies from "../assets/mobil_categorys/Bellies.webp";
import Belts_Wallets from "../assets/mobil_categorys/Belts & Wallets.webp";
import Bike_Accessories from "../assets/mobil_categorys/Bike Accessories.webp";
import Bike_LED_Lights from "../assets/mobil_categorys/Bike LED Lights.webp";
import Blankets_Quilts_Dohars from "../assets/mobil_categorys/Blankets, Quilts & Dohars.webp";
import Blouses from "../assets/mobil_categorys/Blouses.webp";
import Bluetooth_Headphone_Earphones from "../assets/mobil_categorys/Bluetooth Headphone & Earphones.webp";
import books_images_64 from "../assets/mobil_categorys/books_images_64.webp";
import Boots from "../assets/mobil_categorys/Boots.webp";
import Bottomwear from "../assets/mobil_categorys/Bottomwear.webp";
import Boxers from "../assets/mobil_categorys/Boxers.webp";
import Boys_Sets from "../assets/mobil_categorys/Boys Sets.webp";
import Boys_Shoes from "../assets/mobil_categorys/Boys Shoes.webp";
import Bra from "../assets/mobil_categorys/Bra.webp";
import Bridal_Lehenga from "../assets/mobil_categorys/Bridal Lehenga.webp";
import Briefs from "../assets/mobil_categorys/Briefs.webp";
import Brushes_Tools from "../assets/mobil_categorys/Brushes & Tools.webp";
import Caps_Hats from "../assets/mobil_categorys/Caps & Hats.webp";
import Car_Covers from "../assets/mobil_categorys/Car Covers.webp";
import Car_Mobile_Holders from "../assets/mobil_categorys/Car Mobile Holders.webp";
import Car_Repair_Assistance from "../assets/mobil_categorys/Car Repair Assistance.webp";
import Carpets_Doormats from "../assets/mobil_categorys/Carpets & Doormats.webp";
import car_motorbike_images_64 from "../assets/mobil_categorys/car_motorbike_images_64.webp";
import Casual_Shoe from "../assets/mobil_categorys/Casual Shoe.webp";
import Casual_Shoes from "../assets/mobil_categorys/Casual Shoes.webp";
import chiffon_sarees from "../assets/mobil_categorys/chiffon sarees.webp";
import Chikankari_Kurtis from "../assets/mobil_categorys/Chikankari Kurtis.webp";
import Childrens_Books from "../assets/mobil_categorys/Childrens Books.webp";
import Cleaning_Supplies from "../assets/mobil_categorys/Cleaning Supplies.webp";
import Clocks from "../assets/mobil_categorys/Clocks.webp";
import Clutches from "../assets/mobil_categorys/Clutches.webp";
import Coffee from "../assets/mobil_categorys/Coffee.webp";
import Condoms from "../assets/mobil_categorys/Condoms.webp";
import Cookware_Bakeware from "../assets/mobil_categorys/Cookware & Bakeware.webp";
import Cookware from "../assets/mobil_categorys/Cookware.webp";
import Cotton_Kurta_Sets from "../assets/mobil_categorys/Cotton Kurta Sets.webp";
import Cotton_Kurtis from "../assets/mobil_categorys/Cotton Kurtis.webp";
import cotton_sarees from "../assets/mobil_categorys/cotton sarees.webp";
import Cotton_Sets from "../assets/mobil_categorys/Cotton Sets.webp";
import Cotton_Suits from "../assets/mobil_categorys/Cotton Suits.webp";
import Crepe_Suits from "../assets/mobil_categorys/Crepe Suits.webp";
import Cricket from "../assets/mobil_categorys/Cricket.webp";
import Crossbody_Bags_Sling_Bags from "../assets/mobil_categorys/Crossbody Bags & Sling Bags.webp";
import Curtains_Sheers from "../assets/mobil_categorys/Curtains & Sheers.webp";
import Cushions_Cushion_Covers from "../assets/mobil_categorys/Cushions & Cushion Covers.webp";
import Dental_Care from "../assets/mobil_categorys/Dental Care.webp";
import Dhotis_Mundus_Lungis from "../assets/mobil_categorys/Dhotis, Mundus & Lungis.webp";
import Diaries_Notebooks from "../assets/mobil_categorys/Diaries & Notebooks.webp";
import Dinnerware from "../assets/mobil_categorys/Dinnerware.webp";
import Dresse from "../assets/mobil_categorys/Dresse.webp";
import Dresses from "../assets/mobil_categorys/Dresses.webp";
import Dry_Fruits from "../assets/mobil_categorys/Dry Fruits.webp";
import Duffel_Trolley_Bags from "../assets/mobil_categorys/Duffel & Trolley Bags.webp";
import Dupattas from "../assets/mobil_categorys/Dupattas.webp";
import Ear_Buds_Cleaners from "../assets/mobil_categorys/Ear Buds & Cleaners.webp";
import Earrings_Studs from "../assets/mobil_categorys/Earrings & Studs.webp";
import Economics_Commerce from "../assets/mobil_categorys/Economics & Commerce.webp";
import electronics_us_images_64 from "../assets/mobil_categorys/electronics_us_images_64.webp";
import Embroidered_Suits from "../assets/mobil_categorys/Embroidered Suits.webp";
import Ethnic_Jackets from "../assets/mobil_categorys/Ethnic Jackets.webp";
import Ethnicwear from "../assets/mobil_categorys/Ethnicwear.webp";
import Eyes from "../assets/mobil_categorys/Eyes.webp";
import Face_Masks_Peels from "../assets/mobil_categorys/Face Masks & Peels.webp";
import Face from "../assets/mobil_categorys/Face.webp";
import Facecare from "../assets/mobil_categorys/Facecare.webp";
import Files_Desks_Organizers from "../assets/mobil_categorys/Files & Desks Organizers.webp";
import Flats from "../assets/mobil_categorys/Flats.webp";
import Flip_Flops_Sandals from "../assets/mobil_categorys/Flip Flops & Sandals.webp";
import Flipflops_Slippers from "../assets/mobil_categorys/Flipflops & Slippers.webp";
import food_drinks_images_64 from "../assets/mobil_categorys/food_drinks_images_64.webp";
import Football from "../assets/mobil_categorys/Football.webp";
import Footwear from "../assets/mobil_categorys/Footwear.webp";
import Formal_Shoes from "../assets/mobil_categorys/Formal Shoes.webp";
import Fragrances_for_Men from "../assets/mobil_categorys/Fragrances for Men.webp";
import Gardening from "../assets/mobil_categorys/Gardening.webp";
import Georgette_Sarees from "../assets/mobil_categorys/Georgette Sarees.webp";
import Gifts_Mugs from "../assets/mobil_categorys/Gifts & Mugs.webp";
import Girls_Sets from "../assets/mobil_categorys/Girls Sets.webp";
import Girls_Shoes from "../assets/mobil_categorys/Girls Shoes.webp";
import Glasses_Barware from "../assets/mobil_categorys/Glasses & Barware.webp";
import Gown from "../assets/mobil_categorys/Gown.webp";
import Hair_Accessories from "../assets/mobil_categorys/Hair Accessories.webp";
import Haircare from "../assets/mobil_categorys/Haircare.webp";
import Hand_Grip_Strengthener from "../assets/mobil_categorys/Hand Grip Strengthener.webp";
import Handbags from "../assets/mobil_categorys/Handbags.webp";
import Heals_and_Sandals from "../assets/mobil_categorys/Heals and Sandals.webp";
import Health_Monitors from "../assets/mobil_categorys/Health Monitors.webp";
import heavy_work_sarees from "../assets/mobil_categorys/heavy work sarees.webp";
import Helmets from "../assets/mobil_categorys/Helmets.webp";
import Home_Tools from "../assets/mobil_categorys/Home Tools.webp";
import home_kitchen_images_64 from "../assets/mobil_categorys/home_kitchen_images_64.webp";
import Insect_Protection from "../assets/mobil_categorys/Insect Protection.webp";
import Interior_Accessories from "../assets/mobil_categorys/Interior Accessories.webp";
import Islamic_Fashion from "../assets/mobil_categorys/Islamic Fashion.webp";
import Jackets from "../assets/mobil_categorys/Jackets.webp";
import Jeans_Jeggings from "../assets/mobil_categorys/Jeans & Jeggings.webp";
import Jeans from "../assets/mobil_categorys/Jeans.webp";
import Jewellery_Set from "../assets/mobil_categorys/Jewellery Set.webp";
import Jewellery from "../assets/mobil_categorys/Jewellery.webp";
import jewellery_accessories_images_64 from "../assets/mobil_categorys/jewellery_accessories_images_64.webp";
import Jumpsuits from "../assets/mobil_categorys/Jumpsuits.webp";
import Kamarbandh_Maangtika from "../assets/mobil_categorys/Kamarbandh & Maangtika.webp";
import kids_images_64 from "../assets/mobil_categorys/kids_images_64.webp";
import Kitchen_Storage from "../assets/mobil_categorys/Kitchen Storage.webp";
import Kitchen_Tools from "../assets/mobil_categorys/Kitchen Tools.webp";
import Kurta_Palazzo_Sets from "../assets/mobil_categorys/Kurta Palazzo Sets.webp";
import Kurta_Pant_Sets from "../assets/mobil_categorys/Kurta Pant Sets.webp";
import Kurtas_Sets from "../assets/mobil_categorys/Kurtas Sets.webp";
import Lehanga from "../assets/mobil_categorys/Lehanga.webp";
import Lehenga_Cholis from "../assets/mobil_categorys/Lehenga Cholis.webp";
import Lights from "../assets/mobil_categorys/Lights.webp";
import Lips from "../assets/mobil_categorys/Lips.webp";
import Loafers from "../assets/mobil_categorys/Loafers.webp";
import Make_up_Kits from "../assets/mobil_categorys/Make up Kits.webp";
import Makeup_Accessories from "../assets/mobil_categorys/Makeup Accessories.webp";
import Mangalsutras from "../assets/mobil_categorys/Mangalsutras.webp";
import Masalas from "../assets/mobil_categorys/Masalas.webp";
import Maternity_Kurtis_Dresses from "../assets/mobil_categorys/Maternity Kurtis & Dresses.webp";
import Mattress_Protectors from "../assets/mobil_categorys/Mattress Protectors.webp";
import Men_Footwear from "../assets/mobil_categorys/Men Footwear.webp";
import Men_Jewellery from "../assets/mobil_categorys/Men Jewellery.webp";
import Men_Wallets from "../assets/mobil_categorys/Men Wallets.webp";
import men_fashion_images_64 from "../assets/mobil_categorys/men_fashion_images_64.webp";
import Microphone from "../assets/mobil_categorys/Microphone.webp";
import Mobile_Accessories_View_All from "../assets/mobil_categorys/Mobile & Accessories - View All.webp";
import Mobile_cases_and_covers from "../assets/mobil_categorys/Mobile cases and covers.webp";
import Mobile_Chargers from "../assets/mobil_categorys/Mobile Chargers.webp";
import Mobile_Holders from "../assets/mobil_categorys/Mobile Holders.webp";
import Mom_Care from "../assets/mobil_categorys/Mom Care.webp";
import Musical_Accessories from "../assets/mobil_categorys/Musical Accessories.webp";
import musical_instruments_images_64 from "../assets/mobil_categorys/musical_instruments_images_64.webp";
import Nails from "../assets/mobil_categorys/Nails.webp";
import Necklaces from "../assets/mobil_categorys/Necklaces.webp";
import Net_Lehenga from "../assets/mobil_categorys/Net Lehenga.webp";
import net_sarees from "../assets/mobil_categorys/net sarees.webp";
import Newborn_Care from "../assets/mobil_categorys/Newborn Care.webp";
import Nightsuits from "../assets/mobil_categorys/Nightsuits.webp";
import Nightwear from "../assets/mobil_categorys/Nightwear.webp";
import Novels from "../assets/mobil_categorys/Novels.webp";
import office_supplies_images_64 from "../assets/mobil_categorys/office_supplies_images_64.webp";
import Oxidised from "../assets/mobil_categorys/Oxidised.webp";
import Paintings_Photoframes from "../assets/mobil_categorys/Paintings & Photoframes.webp";
import Palazzos from "../assets/mobil_categorys/Palazzos.webp";
import Patiala_Suits from "../assets/mobil_categorys/Patiala Suits.webp";
import Pens_Pencils from "../assets/mobil_categorys/Pens & Pencils.webp";
import Pet_Clothing from "../assets/mobil_categorys/Pet Clothing.webp";
import Pet_Food from "../assets/mobil_categorys/Pet Food.webp";
import Pet_Grooming from "../assets/mobil_categorys/Pet Grooming.webp";
import Pet_Health from "../assets/mobil_categorys/Pet Health.webp";
import Pet_Toys from "../assets/mobil_categorys/Pet Toys.webp";
import Petticoats from "../assets/mobil_categorys/Petticoats.webp";
import pet_supplies_images_64 from "../assets/mobil_categorys/pet_supplies_images_64.webp";
import Photo_Video_Accessories from "../assets/mobil_categorys/Photo & Video Accessories.webp";
import Pillows_Cushions_Covers from "../assets/mobil_categorys/Pillows, Cushions & Covers.webp";
import Power_Bank from "../assets/mobil_categorys/Power Bank.webp";
import Printed_Sets from "../assets/mobil_categorys/Printed Sets.webp";
import Rayon_Kurta_Sets from "../assets/mobil_categorys/Rayon Kurta Sets.webp";
import Rayon_Kurtis from "../assets/mobil_categorys/Rayon Kurtis.webp";
import Rayon_Sets from "../assets/mobil_categorys/Rayon Sets.webp";
import Ready_to_Cook from "../assets/mobil_categorys/Ready to Cook.webp";
import Reference_Books from "../assets/mobil_categorys/Reference Books.webp";
import Religious_Books from "../assets/mobil_categorys/Religious Books.webp";
import Rings from "../assets/mobil_categorys/Rings.webp";
import Rompers from "../assets/mobil_categorys/Rompers.webp";
import Safety_Gear_Clothing from "../assets/mobil_categorys/Safety Gear & Clothing.webp";
import Sandal from "../assets/mobil_categorys/Sandal.webp";
import Sandals from "../assets/mobil_categorys/Sandals.webp";
import Sanitary_Pads from "../assets/mobil_categorys/Sanitary Pads.webp";
import Scarves_and_Stoles from "../assets/mobil_categorys/Scarves and Stoles.webp";
import School_Textbooks_Guides from "../assets/mobil_categorys/School Textbooks & Guides.webp";
import Self_Help_Books from "../assets/mobil_categorys/Self Help Books.webp";
import Sharara_Sets from "../assets/mobil_categorys/Sharara Sets.webp";
import Shirts from "../assets/mobil_categorys/Shirts.webp";
import Short from "../assets/mobil_categorys/Short.webp";
import Shorts from "../assets/mobil_categorys/Shorts.webp";
import Showpieces from "../assets/mobil_categorys/Showpieces.webp";
import silk_sarees from "../assets/mobil_categorys/silk sarees.webp";
import Silk_Suits from "../assets/mobil_categorys/Silk Suits.webp";
import Skating from "../assets/mobil_categorys/Skating.webp";
import Skipping_Ropes from "../assets/mobil_categorys/Skipping Ropes.webp";
import Skirts_Bottomwear from "../assets/mobil_categorys/Skirts & Bottomwear.webp";
import Skirts from "../assets/mobil_categorys/Skirts.webp";
import Slingbags from "../assets/mobil_categorys/Slingbags.webp";
import Smartwatches from "../assets/mobil_categorys/Smartwatches.webp";
import Socks from "../assets/mobil_categorys/Socks.webp";
import Sofa_Diwan_Sets from "../assets/mobil_categorys/Sofa & Diwan Sets.webp";
import Soft_Toys from "../assets/mobil_categorys/Soft Toys.webp";
import Speakers from "../assets/mobil_categorys/Speakers.webp";
import Sports_Bra from "../assets/mobil_categorys/Sports Bra.webp";
import Sports_Shoes from "../assets/mobil_categorys/Sports Shoes.webp";
import sports_fitness_images_64 from "../assets/mobil_categorys/sports_fitness_images_64.webp";
import Stationery from "../assets/mobil_categorys/Stationery.webp";
import Stickers_Wallpapers from "../assets/mobil_categorys/Stickers & Wallpapers.webp";
import Storage_Organizers from "../assets/mobil_categorys/Storage & Organizers.webp";
import String_Instruments from "../assets/mobil_categorys/String Instruments.webp";
import Sunglasse from "../assets/mobil_categorys/Sunglasse.webp";
import Sunglasses from "../assets/mobil_categorys/Sunglasses.webp";
import Sunglassesg from "../assets/mobil_categorys/Sunglassesg.webp";
import Sweat_Belts from "../assets/mobil_categorys/Sweat Belts.webp";
import Sweater_and_Sweatshirts from "../assets/mobil_categorys/Sweater and Sweatshirts.webp";
import T_shirts from "../assets/mobil_categorys/T-shirts.webp";
import Tea from "../assets/mobil_categorys/Tea.webp";
import Top_Wear from "../assets/mobil_categorys/Top Wear.webp";
import Tops from "../assets/mobil_categorys/Tops.webp";
import Towels_Bathrobes from "../assets/mobil_categorys/Towels & Bathrobes.webp";
import Track_Pants from "../assets/mobil_categorys/Track Pants.webp";
import Tripod from "../assets/mobil_categorys/Tripod.webp";
import Trousers_Pants from "../assets/mobil_categorys/Trousers & Pants.webp";
import Trousers from "../assets/mobil_categorys/Trousers.webp";
import Tshirts from "../assets/mobil_categorys/Tshirts.webp";
import Underwears from "../assets/mobil_categorys/Underwears.webp";
import View_All_Books from "../assets/mobil_categorys/View All Books.webp";
import View_All from "../assets/mobil_categorys/View All.webp";
import VR_Box from "../assets/mobil_categorys/VR Box.webp";
import Waist_Bags from "../assets/mobil_categorys/Waist Bags.webp";
import Wallets from "../assets/mobil_categorys/Wallets.webp";
import Watche from "../assets/mobil_categorys/Watche.webp";
import Watches from "../assets/mobil_categorys/Watches.webp";
import Watchesg from "../assets/mobil_categorys/Watchesg.webp";
import Weight_Management from "../assets/mobil_categorys/Weight Management.webp";
import Wind_Instruments from "../assets/mobil_categorys/Wind Instruments.webp";
import Winter_Wear from "../assets/mobil_categorys/Winter Wear.webp";
import Wired_Headphones_Earphones from "../assets/mobil_categorys/Wired Headphones & Earphones.webp";
import Women_Innerwear from "../assets/mobil_categorys/Women Innerwear.webp";
import Women_Nightdress from "../assets/mobil_categorys/Women Nightdress.webp";
import women_ethnic_images_64 from "../assets/mobil_categorys/women_ethnic_images_64.webp";
import women_western_wear_images_64 from "../assets/mobil_categorys/women_western_wear_images_64.webp";
import Yoga from "../assets/mobil_categorys/Yoga.webp";
import help from "../assets/mobil_categorys/help.png";
import { Link } from 'react-router';


const MobileCategories = () => {

    const categories = [
        {
            title: "categories",
            categories: [
                {
                    title: "Women Ethnic",
                    image: women_ethnic_images_64,
                    subcategories: [
                        {
                            header: "Sarees",
                            items: [
                                {
                                    title: "All Sarees",
                                    image: all_sarees
                                },
                                {
                                    title: "Silk Sarees",
                                    image: silk_sarees
                                },
                                {
                                    title: "Banarasi Silk Sarees",
                                    image: banarasi_silk_sarees
                                },
                                {
                                    title: "Cotton Sarees",
                                    image: cotton_sarees
                                },
                                {
                                    title: "Georgette Sarees",
                                    image: Georgette_Sarees
                                },
                                {
                                    title: "Chiffon Sarees",
                                    image: chiffon_sarees
                                },
                                {
                                    title: "Heavy Work Sarees",
                                    image: heavy_work_sarees
                                },
                                {
                                    title: "Net Sarees",
                                    image: net_sarees
                                }
                            ]
                        },
                        {
                            header: "Kurtis",
                            items: [
                                {
                                    title: "All Kurtis",
                                    image: All_Kurtis
                                },
                                {
                                    title: "Anarkali Kurtis",
                                    image: Anarkali_Kurtis
                                },
                                {
                                    title: "Rayon Kurtis",
                                    image: Rayon_Kurtis
                                },
                                {
                                    title: "Cotton Kurtis",
                                    image: Cotton_Kurtis
                                },
                                {
                                    title: "Chikankari Kurtis",
                                    image: Chikankari_Kurtis
                                }
                            ]
                        },
                        {
                            header: "Kurta Sets",
                            items: [
                                {
                                    title: "All Kurta Sets",
                                    image: All_Kurta_Sets
                                },
                                {
                                    title: "Kurta Palazzo Sets",
                                    image: Kurta_Palazzo_Sets
                                },
                                {
                                    title: "Rayon Kurta Sets",
                                    image: Rayon_Kurta_Sets
                                },
                                {
                                    title: "Kurta Pant Sets",
                                    image: Kurta_Pant_Sets
                                },
                                {
                                    title: "Cotton Kurta Sets",
                                    image: Cotton_Kurta_Sets
                                },
                                {
                                    title: "Sharara Sets",
                                    image: Sharara_Sets
                                }
                            ]
                        },
                        {
                            header: "Dupatta Sets",
                            items: [
                                {
                                    title: "Cotton Sets",
                                    image: Cotton_Sets
                                },
                                {
                                    title: "Rayon Sets",
                                    image: Rayon_Sets
                                },
                                {
                                    title: "Printed Sets",
                                    image: Printed_Sets
                                }
                            ]
                        },
                        {
                            header: "Suits & Dress Material",
                            items: [
                                {
                                    title: "All Suits & Dress Material",
                                    image: All_Suits_Dress_Material
                                },
                                {
                                    title: "Cotton Suits",
                                    image: Cotton_Suits
                                },
                                {
                                    title: "Embroidered Suits",
                                    image: Embroidered_Suits
                                },
                                {
                                    title: "Crepe Suits",
                                    image: Crepe_Suits
                                },
                                {
                                    title: "Silk Suits",
                                    image: Silk_Suits
                                },
                                {
                                    title: "Patiala Suits",
                                    image: Patiala_Suits
                                }
                            ]
                        },
                        {
                            header: "Lehengas",
                            items: [
                                {
                                    title: "Lehenga Cholis",
                                    image: Lehenga_Cholis
                                },
                                {
                                    title: "Net Lehenga",
                                    image: Net_Lehenga
                                },
                                {
                                    title: "Bridal Lehenga",
                                    image: Bridal_Lehenga
                                }
                            ]
                        },
                        {
                            header: "Other Ethnic",
                            items: [
                                {
                                    title: "Blouses",
                                    image: Blouses
                                },
                                {
                                    title: "Dupattas",
                                    image: Dupattas
                                },
                                {
                                    title: "Lehanga",
                                    image: Lehanga
                                },
                                {
                                    title: "Gown",
                                    image: Gown
                                },
                                {
                                    title: "Skirts & Bottomwear",
                                    image: Skirts_Bottomwear
                                },
                                {
                                    title: "Islamic Fashion",
                                    image: Islamic_Fashion
                                },
                                {
                                    title: "Petticoats",
                                    image: Petticoats
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Women Western",
                    image: women_western_wear_images_64,
                    subcategories: [
                        {
                            header: "Topwear",
                            items: [
                                {
                                    title: "All Topwear",
                                    image: All_Topwear
                                },
                                {
                                    title: "Tops",
                                    image: Tops
                                },
                                {
                                    title: "Dresses",
                                    image: Dresses
                                },
                                {
                                    title: "T-shirts",
                                    image: T_shirts
                                },
                                {
                                    title: "Jumpsuits",
                                    image: Jumpsuits
                                }
                            ]
                        },
                        {
                            header: "Bottomwear",
                            items: [
                                {
                                    title: "All Bottomwear",
                                    image: All_Bottomwear
                                },
                                {
                                    title: "Jeans & Jeggings",
                                    image: Jeans_Jeggings
                                },
                                {
                                    title: "Trousers & Pants",
                                    image: Trousers_Pants
                                },
                                {
                                    title: "Palazzos",
                                    image: Palazzos
                                },
                                {
                                    title: "Shorts",
                                    image: Shorts
                                },
                                {
                                    title: "Skirts",
                                    image: Skirts
                                }
                            ]
                        },
                        {
                            header: "Innerwear",
                            items: [
                                {
                                    title: "Bra",
                                    image: Bra
                                },
                                {
                                    title: "Women Innerwear",
                                    image: Women_Innerwear
                                },
                                {
                                    title: "Briefs",
                                    image: Briefs
                                }
                            ]
                        },
                        {
                            header: "Sleepwear",
                            items: [
                                {
                                    title: "Nightsuits",
                                    image: Nightsuits
                                },
                                {
                                    title: "Women Nightdress",
                                    image: Women_Nightdress
                                }
                            ]
                        },
                        {
                            header: "Maternity Wear",
                            items: [
                                {
                                    title: "All Maternity & Feedingwear",
                                    image: All_Maternity_Feedingwear
                                },
                                {
                                    title: "Maternity Kurtis & Dresses",
                                    image: Maternity_Kurtis_Dresses
                                }
                            ]
                        },
                        {
                            header: "Sports Wear",
                            items: [
                                {
                                    title: "All Women Sportwear",
                                    image: All_Women_Sportwear
                                },
                                {
                                    title: "Sports Bra",
                                    image: Sports_Bra
                                }
                            ]
                        },
                    ],
                },
                {
                    title: "Men",
                    image: men_fashion_images_64,
                    subcategories: [
                        {
                            header: "Top Wear",
                            items: [
                                {
                                    title: "All Top Wear",
                                    image: All_Top_Wear
                                },
                                {
                                    title: "Tshirts",
                                    image: Tshirts
                                },
                                {
                                    title: "Shirts",
                                    image: Shirts
                                },
                                {
                                    title: "Winter Wear",
                                    image: Winter_Wear
                                },
                                {
                                    title: "Jackets",
                                    image: Jackets
                                },
                                {
                                    title: "Sweater and Sweatshirts",
                                    image: Sweater_and_Sweatshirts
                                }
                            ]
                        },
                        {
                            header: "Bottom Wear",
                            items: [
                                {
                                    title: "Track Pants",
                                    image: Track_Pants
                                },
                                {
                                    title: "Jeans",
                                    image: Jeans
                                },
                                {
                                    title: "Trousers",
                                    image: Trousers
                                },
                                {
                                    title: "Shorts",
                                    image: Short
                                },
                                {
                                    title: "Dhotis, Mundus & Lungis",
                                    image: Dhotis_Mundus_Lungis
                                }
                            ]
                        },
                        {
                            header: "Men Accessories",
                            items: [
                                {
                                    title: "All Men Accessories",
                                    image: All_Men_Accessories
                                },
                                {
                                    title: "Watches",
                                    image: Watches
                                },
                                {
                                    title: "Belts & Wallets",
                                    image: Belts_Wallets
                                },
                                {
                                    title: "Jewellery",
                                    image: Jewellery
                                },
                                {
                                    title: "Sunglasses",
                                    image: Sunglasses
                                },
                                {
                                    title: "Bags",
                                    image: Bags
                                }
                            ]
                        },
                        {
                            header: "Men Footwear",
                            items: [
                                {
                                    title: "Men Footwear",
                                    image: Men_Footwear
                                },
                                {
                                    title: "Casual Shoes",
                                    image: Casual_Shoes
                                },
                                {
                                    title: "Sports Shoes",
                                    image: Sports_Shoes
                                },
                                {
                                    title: "Flip Flops & Sandals",
                                    image: Flip_Flops_Sandals
                                },
                                {
                                    title: "Formal Shoes",
                                    image: Formal_Shoes
                                },
                                {
                                    title: "Loafers",
                                    image: Loafers
                                }
                            ]
                        },
                        {
                            header: "Ethnic Wear",
                            items: [
                                {
                                    title: "Kurtas Sets",
                                    image: Kurtas_Sets
                                },
                                {
                                    title: "Ethnic Jackets",
                                    image: Ethnic_Jackets
                                },
                                {
                                    title: "Bottomwear",
                                    image: Bottomwear
                                }
                            ]
                        },
                        {
                            header: "Inner & Sleep Wear",
                            items: [
                                {
                                    title: "All Inner & Sleep Wear",
                                    image: All_Inner_Sleep_Wear
                                },
                                {
                                    title: "Boxers",
                                    image: Boxers
                                },
                                {
                                    title: "Underwears",
                                    image: Underwears
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Kids",
                    image: kids_images_64,
                    subcategories: [
                        {
                            header: "Boys & Girls 2+ Years",
                            items: [
                                {
                                    title: "Dresses",
                                    image: Dresse
                                },
                                {
                                    title: "Boys Sets",
                                    image: Boys_Sets
                                },
                                {
                                    title: "Girls Sets",
                                    image: Girls_Sets
                                },
                                {
                                    title: "Ethnicwear",
                                    image: Ethnicwear
                                },
                                {
                                    title: "Nightwear",
                                    image: Nightwear
                                },
                                {
                                    title: "Winter Wear",
                                    image: Winter_Wear
                                },
                                {
                                    title: "Top Wear",
                                    image: Top_Wear
                                },
                                {
                                    title: "Bottomwear",
                                    image: Bottomwear
                                }
                            ]
                        },
                        {
                            header: "Infant 0-2 Years",
                            items: [
                                {
                                    title: "Rompers",
                                    image: Rompers
                                },
                                {
                                    title: "Baby Sets",
                                    image: Baby_Sets
                                },
                                {
                                    title: "Ethnicwear",
                                    image: Ethnicwear
                                }
                            ]
                        },
                        {
                            header: "Toys & Accessories",
                            items: [
                                {
                                    title: "Soft Toys",
                                    image: Soft_Toys
                                },
                                {
                                    title: "Footwear",
                                    image: Footwear
                                },
                                {
                                    title: "Stationery",
                                    image: Stationery
                                },
                                {
                                    title: "Watches",
                                    image: Watche
                                },
                                {
                                    title: "Bags & Backpacks",
                                    image: Bags_Backpacks
                                }
                            ]
                        },
                        {
                            header: "Baby Care",
                            items: [
                                {
                                    title: "Baby Bedding & Accessories",
                                    image: Baby_Bedding_Accessories
                                },
                                {
                                    title: "All Baby Care",
                                    image: All_Baby_Care
                                },
                                {
                                    title: "Newborn Care",
                                    image: Newborn_Care
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Home & Kitchen",
                    image: home_kitchen_images_64,
                    subcategories: [
                        {
                            header: "Kitchen & Appliances",
                            items: [
                                {
                                    title: "View All",
                                    image: View_All
                                },
                                {
                                    title: "Kitchen Tools",
                                    image: Kitchen_Tools
                                },
                                {
                                    title: "Storage & Organizers",
                                    image: Storage_Organizers
                                },
                                {
                                    title: "Appliances",
                                    image: Appliances
                                },
                                {
                                    title: "Cookware",
                                    image: Cookware
                                },
                                {
                                    title: "Dinnerware",
                                    image: Dinnerware
                                },
                                {
                                    title: "Bakeware",
                                    image: Bakeware
                                },
                                {
                                    title: "Glasses & Barware",
                                    image: Glasses_Barware
                                }
                            ]
                        },
                        {
                            header: "Home Furnishing",
                            items: [
                                {
                                    title: "Bedsheets",
                                    image: Bedsheets
                                },
                                {
                                    title: "Curtains & Sheers",
                                    image: Curtains_Sheers
                                },
                                {
                                    title: "Pillows, Cushions & Covers",
                                    image: Pillows_Cushions_Covers
                                },
                                {
                                    title: "Cushions & Cushion Covers",
                                    image: Cushions_Cushion_Covers
                                },
                                {
                                    title: "Carpets & Doormats",
                                    image: Carpets_Doormats
                                },
                                {
                                    title: "Mattress Protectors",
                                    image: Mattress_Protectors
                                },
                                {
                                    title: "Sofa & Diwan Sets",
                                    image: Sofa_Diwan_Sets
                                },
                                {
                                    title: "Towels & Bathrobes",
                                    image: Towels_Bathrobes
                                },
                                {
                                    title: "Blankets, Quilts & Dohars",
                                    image: Blankets_Quilts_Dohars
                                }
                            ]
                        },
                        {
                            header: "Home Decor",
                            items: [
                                {
                                    title: "All Home Decor",
                                    image: All_Home_Decor
                                },
                                {
                                    title: "Appliances Covers",
                                    image: Appliances_Covers
                                },
                                {
                                    title: "Clocks",
                                    image: Clocks
                                },
                                {
                                    title: "Storage & Organizers",
                                    image: Storage_Organizers
                                },
                                {
                                    title: "Showpieces",
                                    image: Showpieces
                                },
                                {
                                    title: "Paintings & Photoframes",
                                    image: Paintings_Photoframes
                                },
                                {
                                    title: "Stickers & Wallpapers",
                                    image: Stickers_Wallpapers
                                },
                                {
                                    title: "Lights",
                                    image: Lights
                                },
                                {
                                    title: "Gifts & Mugs",
                                    image: Gifts_Mugs
                                }
                            ]
                        },
                        {
                            header: "Kitchen & Dining",
                            items: [
                                {
                                    title: "Kitchen Storage",
                                    image: Kitchen_Storage
                                },
                                {
                                    title: "Cookware & Bakeware",
                                    image: Cookware_Bakeware
                                }
                            ]
                        },
                        {
                            header: "Home Improvement",
                            items: [
                                {
                                    title: "All Home Essentials",
                                    image: All_Home_Essentials
                                },
                                {
                                    title: "Cleaning Supplies",
                                    image: Cleaning_Supplies
                                },
                                {
                                    title: "Gardening",
                                    image: Gardening
                                },
                                {
                                    title: "Bathroom Accessories",
                                    image: Bathroom_Accessories
                                },
                                {
                                    title: "Insect Protection",
                                    image: Insect_Protection
                                },
                                {
                                    title: "Home Tools",
                                    image: Home_Tools
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Beauty & Health",
                    image: beauty_health_images_64,
                    subcategories: [
                        {
                            header: "Make up",
                            items: [
                                {
                                    title: "Face",
                                    image: Face
                                },
                                {
                                    title: "Eyes",
                                    image: Eyes
                                },
                                {
                                    title: "Lips",
                                    image: Lips
                                },
                                {
                                    title: "Nails",
                                    image: Nails
                                },
                                {
                                    title: "Make up Kits",
                                    image: Make_up_Kits
                                },
                                {
                                    title: "Appliances",
                                    image: Appliances
                                },
                                {
                                    title: "Brushes & Tools",
                                    image: Brushes_Tools
                                },
                                {
                                    title: "Makeup Accessories",
                                    image: Makeup_Accessories
                                }
                            ]
                        },
                        {
                            header: "Skincare",
                            items: [
                                {
                                    title: "View All",
                                    image: View_All
                                },
                                {
                                    title: "Face Masks & Peels",
                                    image: Face_Masks_Peels
                                },
                                {
                                    title: "Facecare",
                                    image: Facecare
                                },
                                {
                                    title: "Haircare",
                                    image: Haircare
                                },
                                {
                                    title: "Bath & Shower",
                                    image: Bath_Shower
                                }
                            ]
                        },
                        {
                            header: "Baby & Mom",
                            items: [
                                {
                                    title: "Baby Personal Care",
                                    image: Baby_Personal_Care
                                },
                                {
                                    title: "Mom Care",
                                    image: Mom_Care
                                }
                            ]
                        },
                        {
                            header: "Mens Care",
                            items: [
                                {
                                    title: "Beard Care",
                                    image: Beard_Care
                                },
                                {
                                    title: "Fragrances for Men",
                                    image: Fragrances_for_Men
                                }
                            ]
                        },
                        {
                            header: "Healthcare",
                            items: [
                                {
                                    title: "Ear Buds & Cleaners",
                                    image: Ear_Buds_Cleaners
                                },
                                {
                                    title: "Condoms",
                                    image: Condoms
                                },
                                {
                                    title: "Sanitary Pads",
                                    image: Sanitary_Pads
                                },
                                {
                                    title: "Dental Care",
                                    image: Dental_Care
                                },
                                {
                                    title: "Weight Management",
                                    image: Weight_Management
                                },
                                {
                                    title: "Health Monitors",
                                    image: Health_Monitors
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Jewellery & Accessories",
                    image: jewellery_accessories_images_64,
                    subcategories: [
                        {
                            header: "Jewellery",
                            items: [
                                {
                                    title: "All Jewellery",
                                    image: All_Jewellery
                                },
                                {
                                    title: "Jewellery Set",
                                    image: Jewellery_Set
                                },
                                {
                                    title: "Earrings & Studs",
                                    image: Earrings_Studs
                                },
                                {
                                    title: "Mangalsutras",
                                    image: Mangalsutras
                                },
                                {
                                    title: "Bangles",
                                    image: Bangles
                                },
                                {
                                    title: "Necklaces",
                                    image: Necklaces
                                },
                                {
                                    title: "Rings",
                                    image: Rings
                                },
                                {
                                    title: "Kamarbandh & Maangtika",
                                    image: Kamarbandh_Maangtika
                                },
                                {
                                    title: "Anklets",
                                    image: Anklets
                                },
                                {
                                    title: "Men Jewellery",
                                    image: Men_Jewellery
                                },
                                {
                                    title: "Oxidised",
                                    image: Oxidised
                                }
                            ]
                        },
                        {
                            header: "Men Accessories",
                            items: [
                                {
                                    title: "View All",
                                    image: View_All
                                },
                                {
                                    title: "Men Watches",
                                    image: Watches
                                },
                                {
                                    title: "Men Sunglasses",
                                    image: Sunglasses
                                },
                                {
                                    title: "Belts & Wallets",
                                    image: Belts_Wallets
                                },
                                {
                                    title: "Men Tops",
                                    image: Caps_Hats
                                }
                            ]
                        },
                        {
                            header: "Women Accessory",
                            items: [
                                {
                                    title: "Women Watches",
                                    image: Watchesg
                                },
                                {
                                    title: "Hair Accessories",
                                    image: Hair_Accessories
                                },
                                {
                                    title: "Women Sunglasses",
                                    image: Sunglassesg
                                },
                                {
                                    title: "Women Tops",
                                    image: Socks
                                },
                                {
                                    title: "Scarves and Stoles",
                                    image: Scarves_and_Stoles
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Bags & Footwear",
                    image: bags_footwear_Images_64,
                    subcategories: [
                        {
                            header: "Women Bags",
                            items: [
                                {
                                    title: "All Women Bags",
                                    image: All_Women_Bags
                                },
                                {
                                    title: "Handbags",
                                    image: Handbags
                                },
                                {
                                    title: "Clutches",
                                    image: Clutches
                                },
                                {
                                    title: "Slingbags",
                                    image: Slingbags
                                },
                                {
                                    title: "Wallets",
                                    image: Wallets
                                },
                                {
                                    title: "Backpacks",
                                    image: Backpacks
                                }
                            ]
                        },
                        {
                            header: "Men Bags",
                            items: [
                                {
                                    title: "Men Wallets",
                                    image: Men_Wallets
                                },
                                {
                                    title: "Crossbody Bags & Sling Bags",
                                    image: Crossbody_Bags_Sling_Bags
                                },
                                {
                                    title: "Waist Bags",
                                    image: Waist_Bags
                                }
                            ]
                        },
                        {
                            header: "Travel Bags, Luggage and Accessories",
                            items: [
                                {
                                    title: "View All",
                                    image: View_All
                                },
                                {
                                    title: "Duffel & Trolley Bags",
                                    image: Duffel_Trolley_Bags
                                }
                            ]
                        },
                        {
                            header: "Men Footwear",
                            items: [
                                {
                                    title: "Sports Shoes",
                                    image: Sports_Shoes
                                },
                                {
                                    title: "Casual Shoes",
                                    image: Casual_Shoes
                                },
                                {
                                    title: "Formal Shoes",
                                    image: Formal_Shoes
                                },
                                {
                                    title: "Sandals",
                                    image: Sandals
                                },
                                {
                                    title: "Loafers",
                                    image: Loafers
                                }
                            ]
                        },
                        {
                            header: "Women Footwear",
                            items: [
                                {
                                    title: "Flats",
                                    image: Flats
                                },
                                {
                                    title: "Bellies",
                                    image: Bellies
                                },
                                {
                                    title: "Heals and Sandals",
                                    image: Heals_and_Sandals
                                },
                                {
                                    title: "Boots",
                                    image: Boots
                                },
                                {
                                    title: "Flipflops & Slippers",
                                    image: Flipflops_Slippers
                                }
                            ]
                        },
                        {
                            header: "Kids Footwear",
                            items: [
                                {
                                    title: "Boys Shoes",
                                    image: Boys_Shoes
                                },
                                {
                                    title: "Girls Shoes",
                                    image: Girls_Shoes
                                },
                                {
                                    title: "Casual Shoes",
                                    image: Casual_Shoe
                                },
                                {
                                    title: "Flipflops & Slippers",
                                    image: Flipflops_Slippers
                                },
                                {
                                    title: "Sandals",
                                    image: Sandals
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Electronics",
                    image: electronics_us_images_64,
                    subcategories: [
                        {
                            header: "Audio",
                            items: [
                                {
                                    title: "Bluetooth Headphone & Earphones",
                                    image: Bluetooth_Headphone_Earphones
                                },
                                {
                                    title: "Wired Headphones & Earphones",
                                    image: Wired_Headphones_Earphones
                                },
                                {
                                    title: "Speakers",
                                    image: Speakers
                                }
                            ]
                        },
                        {
                            header: "Mobile & Accessories",
                            items: [
                                {
                                    title: "Mobile & Accessories View All",
                                    image: Mobile_Accessories_View_All
                                },
                                {
                                    title: "Smartwatches",
                                    image: Smartwatches
                                },
                                {
                                    title: "Mobile Holders",
                                    image: Mobile_Holders
                                },
                                {
                                    title: "Power Bank",
                                    image: Power_Bank
                                },
                                {
                                    title: "Mobile cases and covers",
                                    image: Mobile_cases_and_covers
                                },
                                {
                                    title: "Mobile Chargers",
                                    image: Mobile_Chargers
                                }
                            ]
                        },
                        {
                            header: "Smart Wearables",
                            items: [
                                {
                                    title: "VR Box",
                                    image: VR_Box
                                },
                                {
                                    title: "Tripod",
                                    image: Tripod
                                },
                                {
                                    title: "Microphone",
                                    image: Microphone
                                },
                                {
                                    title: "Photo & Video Accessories",
                                    image: Photo_Video_Accessories
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Sports & Fitness",
                    image: sports_fitness_images_64,
                    subcategories: [
                        {
                            header: "Fitness",
                            items: [
                                {
                                    title: "Yoga",
                                    image: Yoga
                                },
                                {
                                    title: "Hand Grip Strengthener",
                                    image: Hand_Grip_Strengthener
                                },
                                {
                                    title: "Abs Wheel Roller",
                                    image: Abs_Wheel_Roller
                                },
                                {
                                    title: "Skipping Ropes",
                                    image: Skipping_Ropes
                                },
                                {
                                    title: "Sweat Belts",
                                    image: Sweat_Belts
                                }
                            ]
                        },
                        {
                            header: "Sports",
                            items: [
                                {
                                    title: "Bandminton",
                                    image: Bandminton
                                },
                                {
                                    title: "Skating",
                                    image: Skating
                                },
                                {
                                    title: "Football",
                                    image: Football
                                },
                                {
                                    title: "Cricket",
                                    image: Cricket
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Car & Motorbike",
                    image: car_motorbike_images_64,
                    subcategories: [
                        {
                            header: "Car Accessories",
                            items: [
                                {
                                    title: "Car Covers",
                                    image: Car_Covers
                                },
                                {
                                    title: "Interior Accessories",
                                    image: Interior_Accessories
                                },
                                {
                                    title: "Car Mobile Holders",
                                    image: Car_Mobile_Holders
                                },
                                {
                                    title: "Car Repair Assistance",
                                    image: Car_Repair_Assistance
                                }
                            ]
                        },
                        {
                            header: "Motorbike Accessories",
                            items: [
                                {
                                    title: "Helmets",
                                    image: Helmets
                                },
                                {
                                    title: "Bike Accessories",
                                    image: Bike_Accessories
                                },
                                {
                                    title: "Bike LED Lights",
                                    image: Bike_LED_Lights
                                },
                                {
                                    title: "Safety Gear & Clothing",
                                    image: Safety_Gear_Clothing
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Office Supplies & Stationery",
                    image: office_supplies_images_64,
                    subcategories: [
                        {
                            header: "Office Supplies & Stationery",
                            items: [
                                {
                                    title: "Diaries & Notebooks",
                                    image: Diaries_Notebooks
                                },
                                {
                                    title: "Adhesives & Tapes",
                                    image: Adhesives_Tapes
                                },
                                {
                                    title: "Files & Desks Organizers",
                                    image: Files_Desks_Organizers
                                },
                                {
                                    title: "Pens & Pencils",
                                    image: Pens_Pencils
                                },
                                {
                                    title: "Paintings & Photoframes",
                                    image: Paintings_Photoframes
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Pet Supplies",
                    image: pet_supplies_images_64,
                    subcategories: [
                        {
                            header: "Pet Supplies",
                            items: [
                                {
                                    title: "Pet Toys",
                                    image: Pet_Toys
                                },
                                {
                                    title: "Pet Grooming",
                                    image: Pet_Grooming
                                },
                                {
                                    title: "Pet Food",
                                    image: Pet_Food
                                },
                                {
                                    title: "Pet Clothing",
                                    image: Pet_Clothing
                                },
                                {
                                    title: "Pet Health",
                                    image: Pet_Health
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Food & Drinks",
                    image: food_drinks_images_64,
                    subcategories: [
                        {
                            header: "Food & Drinks",
                            items: [
                                {
                                    title: "Dry Fruits",
                                    image: Dry_Fruits
                                },
                                {
                                    title: "Tea",
                                    image: Tea
                                },
                                {
                                    title: "Masalas",
                                    image: Masalas
                                },
                                {
                                    title: "Coffee",
                                    image: Coffee
                                },
                                {
                                    title: "Ready to Cook",
                                    image: Ready_to_Cook
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Musical Instruments",
                    image: musical_instruments_images_64,
                    subcategories: [
                        {
                            header: "Musical Instruments",
                            items: [
                                {
                                    title: "All Musical Instruments",
                                    image: All_Musical_Instruments
                                },
                                {
                                    title: "String Instruments",
                                    image: String_Instruments
                                },
                                {
                                    title: "Musical Accessories",
                                    image: Musical_Accessories
                                },
                                {
                                    title: "Wind Instruments",
                                    image: Wind_Instruments
                                }
                            ]
                        }
                    ],
                },
                {
                    title: "Books",
                    image: books_images_64,
                    subcategories: [
                        {
                            header: "Fiction & Non Fiction",
                            items: [
                                {
                                    title: "View All Books",
                                    image: View_All_Books
                                },
                                {
                                    title: "Childrens Books",
                                    image: Childrens_Books
                                },
                                {
                                    title: "Self Help Books",
                                    image: Self_Help_Books
                                },
                                {
                                    title: "Novels",
                                    image: Novels
                                },
                                {
                                    title: "Economics & Commerce",
                                    image: Economics_Commerce
                                },
                                {
                                    title: "Religious Books",
                                    image: Religious_Books
                                },
                            ]
                        },
                        {
                            header: "Academic Books",
                            items: [
                                {
                                    title: "School Textbooks & Guides",
                                    image: School_Textbooks_Guides
                                },
                                {
                                    title: "Reference Books",
                                    image: Reference_Books
                                },
                            ]
                        },
                    ],
                },
                {
                    title: "Help & More",
                    image: help,
                    subcategories: [
                        {
                            header: "Top Wear",
                            items: [
                                {
                                    title: "All Top Wear",
                                    image: "\assets/mobil categorys/All Top Wear.webp"
                                },
                                {
                                    title: "T-Shirts",
                                    image: "\assets/mobil categorys/All Top Wear.webp"
                                },
                                {
                                    title: "Shirts",
                                    image: "\assets/mobil categorys/All Top Wear.webp"
                                },
                            ]
                        },
                    ],
                },
            ]
        },
        {
            title: "filter",
            categories: []
        }
    ];


    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const sectionRefs = useRef({});

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (sectionRefs.current[category]) {
            sectionRefs.current[category].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const containerRef = useRef(null);

    const handleScroll = () => {
        const rightContainer = document.getElementById("rightContainer");
        const scrollPosition = rightContainer.scrollTop;

        let closestCategory = null;
        let minDistance = Infinity;

        Object.keys(sectionRefs.current).forEach((category) => {
            const section = sectionRefs.current[category];
            if (section) {
                const distance = Math.abs(section.offsetTop - scrollPosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCategory = category;
                }
            }
        });
        console.log("hiiii123");
        scrollToActiveCategory(containerRef);
        setActiveCategory(closestCategory);
    };

    const scrollToActiveCategory = (containerRef) => {
        if (containerRef.current) {
            const activeElement = containerRef.current.querySelector(".active-category");
            if (activeElement) {
                containerRef.current.scrollTo({
                    top: activeElement.offsetTop - 50, // थोड़ा offset देकर scroll करें
                    behavior: "smooth"
                });
            }
        }
    };




    return (
        <ul className="flex justify-evenly w-full border-b border-gray-400 h-[40px]">
            {categories.map((category, index) => (
                <div key={index} className="h-full w-full">
                    <button
                        className={`px-4 border h-full w-full rounded-md border-transparent hover:border-black hover:rounded ${openDropdown === index ? "bg-gray-500 text-white" : ""}`}
                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                        <span className=" ml-2">{category.title}</span>
                    </button>
                    {openDropdown === index && (
                        <ul className="w-[100vw] fixed left-0 top-29 px-1 md:px-6 lg:px-8 bg-gray-200">
                            <div className="flex h-screen text-sm">
                                {/* Left Side (20%) */}
                                <div ref={containerRef} className="w-1/4 bg-gray-200 px-2 overflow-y-auto flex flex-col items-start">
                                    {category.categories.map((sub, subIndex) => (
                                        <div
                                            key={subIndex}
                                            onClick={() => handleCategoryClick(sub.title)}
                                            className={`w-full py-4 flex flex-col items-center rounded-t-md border-b justify-center my-1 text-left cursor-pointer
                                                    ${activeCategory === sub.title ? "bg-gray-500 font-white active-category" : ""}
                                                    ${subIndex === category.categories.length - 1 ? "mb-[50vh]" : ""}`}
                                        >
                                            <img src={`${sub.image}`} alt={sub.title} className={`pb-2 ${subIndex === category.categories.length - 1 ? "w-[70px] h-[70px] bg-transparent" : ""}`} />
                                            <span className='px-3'>{sub.title}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side (80%) - Scrollable */}
                                <div
                                    id="rightContainer"
                                    className="w-3/4 bg-gray-100 p-4 overflow-y-auto h-screen"
                                    onScroll={handleScroll}
                                >
                                    {category.categories.map((sub, subIndex) => (
                                        <div
                                            key={subIndex}
                                            ref={(el) => (sectionRefs.current[sub.title] = el)}
                                            className={`p-1 flex flex-col ${subIndex === category.categories.length - 1 ? "mb-[50vh]" : ""}`}
                                        >
                                            {subIndex === category.categories.length - 1 ? (
                                                <>
                                                    <h2 className="py-2 font-bold text-xl">Help & More</h2>
                                                    <div className="p-1 flex flex-col">
                                                        <h2 className="py-2 font-bold text-sm"></h2>
                                                        <div className="flex flex-row flex-wrap py-4">Help & More</div>
                                                        <a href="#" className='text-blue-500 py-2'>Become A Supplier</a>
                                                        <div className="flex flex-row flex-wrap py-4">Contact Us</div>
                                                        <a href="#" className='text-blue-500 py-2'>Query@Shopingmart.com</a>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <h2 className="py-2 font-bold text-xl">{sub.title}</h2>
                                                    {sub.subcategories.map((subcategories, subcategoriesIndex) => (
                                                        <div
                                                            key={subcategoriesIndex}
                                                            className="p-1 flex flex-col"
                                                        >
                                                            <h2 className="py-2 font-bold text-sm">{subcategories.header}</h2>
                                                            <div className="flex flex-row flex-wrap">
                                                                {subcategories.items.map((subcategoriesitems, subcategoriesitemsIndex) => (
                                                                    <Link
                                                                        to={`/search/${sub.title} ${subcategoriesitems.title}`}
                                                                        onClick={() => setOpenDropdown(null)}
                                                                        key={subcategoriesitemsIndex}
                                                                        className="w-1/3 p-1 flex flex-col"
                                                                    >
                                                                        <img src={`${subcategoriesitems.image}`} alt={`${subcategoriesitems.title}`} className='rounded-full w-[70px] h-[70px]' />
                                                                        <h2 className="py-2 text-sm">{subcategoriesitems.title}</h2>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </ul>
                    )}
                </div>
            ))}
        </ul>
    )
}

export default MobileCategories;