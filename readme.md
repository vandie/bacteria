# Bacteria
## Introduction
Bacteria is a small program I wrote for a job programming exercise.

## The Task
Build a simulation of a 2-dimensional grid petri dish of bacteria. The bacteria in dish live and die by the following rules based on the bacteria surrounding it:
1. Any live bacteria cell with fewer than two live neighbours dies, as if caused by under-population
2. Any live bacteria cell with two or three live neighbours lives on to the next generation.
3. Any live bacteria cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead bacteria cell with exactly three live neighbours becomes a live bacteria cell, as if by reproduction.

The the program will take from standard input a series of comma separated integer x,y pairs each on a new line that indicate the location of live bacteria cells. The input will be terminated with end. Output the results of your simulation to standard output consisting the of x,y pairs marking the locations of live bacteria cells after one generation has completed, terminate your output with end. The output of your program should be able to be used to feed into your program again to perform another “generation”.

## Setup
This project doesn't use any npm modules so provided NodeJS as well as NPM or Yarn are installed, this should work. This was written using NodeJS v10.15.0, it has not been tested on other NodeJS versions

## Running
From the project directory. Run `yarn start` and follow the on screen instructions.

## Visual Mode
While I was building the application. I built a visual mode for debugging purposes. This was not part of the task but, if you are interested, it can be ran with `yarn start-visual`.

[![Twitter Follow](https://img.shields.io/twitter/follow/mvd_vandie.svg?label=Follow%20on%20Twitter&style=flat-square)](https://twitter.com/MVD_Vandie) 
[![GitHub followers](https://img.shields.io/github/followers/vandie.svg?label=Follow%20on%20Github&style=flat-square)](https://github.com/vandie)