import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Image from "next/image";
import logo from "@/app/assets/img/logo.png";

const titles = [
  null,
  "Object: Andromeda",
  "ngc 13",
  "Coords: 19h17m32s 11d58m02s",
  "Coords: 19h17m32s 11d58m02s",
  "Coords: 0h55m14.98s 24d33m54.7s",
  " CT-Scan Results",
];

const subtitles = [
  null,
  "5000 arcseconds",
  "500 arcseconds",
  "500 arcseconds",
  "2000 arcseconds",
  "",
];

export default function Navbar({ selectedImage }: { selectedImage?: number }) {
  return (
    <Box sx={{ flexGrow: 1, position: "sticky" }}>
      <AppBar
        sx={{ backgroundColor: "black" }}
        className="border-b border-gray-900"
      >
        <Toolbar>
          <div className="absolute w-44 h-14 top-1">
            <Image
              fill
              src={logo}
              alt="Hypersonify Logo"
              className="object-contain"
            />
          </div>

          <div className="grow">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              {selectedImage ? titles[selectedImage] : null}
            </Typography>
            {selectedImage && subtitles[selectedImage] && (
              <p className="text-center text-sm text-gray-500">
                Image Size: {subtitles[selectedImage]}
              </p>
            )}
          </div>

          {/* <IconButton
            sx={{
              ":hover": {
                bgcolor: "rgb(17 24 39)",
              },
              color: "white",
            }}
          >
            <PhotoLibraryIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
