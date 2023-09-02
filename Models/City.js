import { ObjectId } from "mongodb"
import mongoose from "mongoose"

let City_scheme= new mongoose.Schema({
    Name : {type:String , required:true,unique:true},
    country : {type:mongoose.SchemaTypes.ObjectId , ref:"Country"}

})

let City = new mongoose.model("City",City_scheme)



let array =  [
  "Abbeyfeale",
  "Abbeyleix",
  "Ardee",
  "Arklow",
  "Artane",
  "Ashbourne",
  "Athboy",
  "Athenry",
  "Athlone",
  "Athy",
  "Bagenalstown",
  "Bailieborough",
  "Balbriggan",
  "Baldoyle",
  "Balgriffin",
  "Ballina",
  "Ballinadee",
  "Ballinasloe",
  "Ballincollig",
  "Ballineen",
  "Ballinrobe",
  "Ballintober",
  "Ballivor",
  "Ballon",
  "Ballsbridge",
  "Ballybrack",
  "Ballybrit",
  "Ballycullen",
  "Ballyfermot",
  "Ballygarvan",
  "Ballyhooly",
  "Ballymahon",
  "Ballymote",
  "Ballymount",
  "Ballymun",
  "Ballyphilip",
  "Ballyragget",
  "Ballyroe",
  "Ballyvaghan",
  "Bandon",
  "Bantry",
  "Berrings",
  "Bettystown",
  "Birr",
  "Blackrock",
  "Blanchardstown",
  "Blessington",
  "Bodyke",
  "Boherbue",
  "Bray",
  "Broadford",
  "Buncrana",
  "Bundoran",
  "Cabinteely",
  "Cabra",
  "Caher",
  "Cahersiveen",
  "Callan",
  "Carbury",
  "Carlow",
  "Carnew",
  "Carraroe",
  "Carrick",
  "Carrick on Shannon",
  "Carrick-on-Suir",
  "Carrickmacross",
  "Carrickmines",
  "Carrigaline",
  "Carrigtohill",
  "Cashel",
  "Castlebar",
  "Castleblayney",
  "Castlebridge",
  "Castleknock",
  "Castlemaine",
  "Castlerea",
  "Cavan",
  "Celbridge",
  "Clane",
  "Clarecastle",
  "Claregalway",
  "Claremorris",
  "Clogherhead",
  "Clonakilty",
  "Clondalkin",
  "Clonee",
  "Clones",
  "Clonmel",
  "Clonsilla",
  "Clontarf",
  "Coachford",
  "Cobh",
  "Coolock",
  "Cork",
  "County Galway",
  "County Wexford",
  "Courtown",
  "Crookhaven",
  "Cross",
  "Crosshaven",
  "Crumlin",
  "Crusheen",
  "Dalkey",
  "Delgany",
  "Donabate",
  "Donegal",
  "Donnybrook",
  "Doolin",
  "Doughiska",
  "Douglas",
  "Drogheda",
  "Droichead Nua",
  "Dublin",
  "Duleek",
  "Dunboyne",
  "Dundalk",
  "Dundrum",
  "Dundrum",
  "Dungarvan",
  "Dunlavin",
  "Dunleer",
  "Dunshaughlin",
  "Edenderry",
  "Enfield",
  "Ennis",
  "Enniscorthy",
  "Enniskerry",
  "Feakle",
  "Ferbane",
  "Fermoy",
  "Finglas",
  "Firhouse",
  "Foxford",
  "Foxrock",
  "Foynes",
  "Galway",
  "Garristown",
  "Geevagh",
  "Glanmire",
  "Glasnevin",
  "Glen",
  "Glenealy",
  "Glengarriff",
  "Glenties",
  "Gorey",
  "Gort",
  "Grange",
  "Greystones",
  "Headford",
  "Hospital",
  "Inchicore",
  "Irishtown",
  "Island",
  "Jamestown",
  "Kanturk",
  "Kells",
  "Kenmare",
  "Kilbride Cross Roads",
  "Kilcock",
  "Kilcoole",
  "Kilcullen",
  "Kildalkey",
  "Kildare",
  "Kilfinane",
  "Kilkenny",
  "Killala",
  "Killaloe",
  "Killarney",
  "Killiney",
  "Killinick",
  "Killorglin",
  "Killurin",
  "Killybegs",
  "Killygordon",
  "Kilmainham",
  "Kilmichael",
  "Kilmore",
  "Kilrush",
  "Kiltamagh",
  "Kingscourt",
  "Kingswood",
  "Kinsale",
  "Kinvarra",
  "Leamlara",
  "Leixlip",
  "Leopardstown",
  "Letterkenny",
  "Limerick",
  "Lisselton",
  "Listowel",
  "Longford",
  "Longwood",
  "Loughrea",
  "Louth",
  "Lucan",
  "Lusk",
  "Macroom",
  "Malahide",
  "Mallow",
  "Manorhamilton",
  "Marino",
  "Maynooth",
  "Mayo",
  "Midleton",
  "Milltown",
  "Mitchelstown",
  "Monaghan",
  "Monasterevin",
  "Monkstown",
  "Mornington",
  "Mount Merrion",
  "Mountrath",
  "Moycullen",
  "Mullinavat",
  "Mullingar",
  "Naas",
  "Naul",
  "Navan",
  "Nenagh",
  "New Ross",
  "Newcastle West",
  "Newmarket",
  "Newport",
  "Oranmore",
  "Oughterard",
  "Oysterhaven",
  "Passage West",
  "Patrickswell",
  "Portarlington",
  "Porterstown",
  "Portmarnock",
  "Portumna",
  "Prosperous",
  "Raheny",
  "Rathcoole",
  "Rathfarnham",
  "Rathgar",
  "Rathmines",
  "Rathmolyon",
  "Rathowen",
  "Ratoath",
  "Ringaskiddy",
  "River",
  "Roscommon",
  "Roscrea",
  "Rush",
  "Saggart",
  "Saint Mullins",
  "Sallins",
  "Sallynoggin",
  "Sandyford",
  "Sandymount",
  "Santry",
  "Seafield",
  "Shankill",
  "Shannon",
  "Shrule",
  "Sixmilebridge",
  "Skerries",
  "Skibbereen",
  "Slieve",
  "Sligo",
  "Spiddal",
  "Stepaside",
  "Stillorgan",
  "Stradbally",
  "Straffan",
  "Summerhill",
  "Sutton",
  "Swinford",
  "Swords",
  "Tallaght",
  "Templeogue",
  "Terenure",
  "Thomastown",
  "Thurles",
  "Tipperary",
  "Tralee",
  "Trim",
  "Tuam",
  "Tullamore",
  "Tullow",
  "Tyrrellspass",
  "Virginia",
  "Walkinstown",
  "Waterford",
  "Westport",
  "Wexford",
  "Wicklow",
  "Williamstown",
  "Windy Arbour",
  "Youghal"      
]

let modified_array = array.map((item)=>{ return{Name:item,country:"64f36eeeaf3a5a29b6c0a0b8"}})

console.log(modified_array)

//modified_array.map((item)=> {let y1=new City(item).save()})



    


export default City
