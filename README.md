# 42_Camagru
This project aims to create a small Instagram-like site allowing users to create and share photo-montages.

## Example

## Expected Result

## Technical Stack

## Docker
This project use Docker for containerisation.  
Docker need to be installed on your system: https://www.docker.com/  

## Start
Start the Backend container.
```
docker-compose up
```

## Stop
Stop the Backend container.
```
docker-compose down
```

## Clean
Delete the Backend Container, the Camagru Image and the associated Volume.  
It will not affect the source code.
```
docker-compose down -v
```
```
docker image prune -a
```
```
docker volume prune
```

## Usage
```
./fractol mandelbrot
```

## Fractals list
```
./fractol -l
```
1) Mandelbrot		
2) Julia		
3) Burning_ship		
4) Multibrot		
5) Buddhabrot		
6) Newton		
7) Koch		
8) Sierpinski		
9) Barnsley

## MAN (complete user manual)
```
./fractol -h
```

## Screenshots
![mandelbrot_neutral_ssaa8](https://user-images.githubusercontent.com/52746061/205167885-e67f2d7e-cbc0-4ede-bc6e-d5ea0883dc8e.png)  
![julia_fairy_ssaa8](https://user-images.githubusercontent.com/52746061/205167784-4625719b-3d40-48dc-9511-55fa1e99b1c9.png)  
![julia_hsv_ssaa8](https://user-images.githubusercontent.com/52746061/205167823-20f8035c-f357-46df-8755-3424a8f39510.png)  
![burning_ship_fire_ssaa8](https://user-images.githubusercontent.com/52746061/205167719-3b9fd6aa-ea60-4842-8dd3-a985ca0d37dd.png)  
![barnsley_camo_ssaa8](https://user-images.githubusercontent.com/52746061/205167631-c36faa2e-1400-479d-846e-af0ff666d05b.png)  
![buddha_nasa_ssaa8_2](https://user-images.githubusercontent.com/52746061/205173610-385d3793-bda0-458c-9c56-22cc2d7b401c.png)  

More screenshots are availables in the "screens" folder.

## Notes
I recommand to use the "clang" compiler because "gcc" generates linking error with the minilibx.  
Check that clang compiler is installed on your system.

If there is permission issue:
```
chmod 774 lib/minilibx-linux/configure
```

## Keywords
2D programming  
Multi-Threading  
Complex numbers  
Mathematical equations  
Fractals  
