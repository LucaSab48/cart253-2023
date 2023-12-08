# Instrument-Simulator
## Luca Sabelli

For this final project, I decided to make an instrument simulator with more unconventional instruments. This final project was picked to allow me to practice using the different sound options in p5.js such as sound files and the oscillator function. I got to learn and practice some of the methods within the sound library, such as amplitude, pan, rate, etc. I also tried practicing with object-oriented programming even though I am still not super comfortable using it. In the simulator, I made three different instruments. The first one is a drum kit. I used a bunch of different sound files that play when the user clicks each object. I added some movement to the drum kit objects when the user clicks on the object so that they shrink. I also added a drum stick instead of the users mouse to interact with the drum kit objects. Each time you click the objects, the drum stick rotates down as if it's hitting it. The bass of the drum doesn't shrink, instead there is a kick for it that moves as if it is hitting the bass. There is also a play and stop button that plays a random song to play along with. There is 5 different songs that can play. To pick a new song, you have to stop the song. The second instrument is a theremin that I actually made for a previous exercise. It uses an oscillator and changes the amplitude and frequency depending on mouse position. There is also buttons on the theremin base that allow the user to change the wave type for the oscillator. If the user hits the enter button, there is a mini game that plays where the user has to chase around a red circle while playing the theremin. I added audio sound effects for winning the game and for collecting the circles. There is also a bezier line behind the theremin so that there is another element of interactivity. The curves change depending on the frequency and amplitude. I also display the values of the amplitude, frequency, and wave type. The final instrument is my favorite and probably the one I spent the most time on, the choir. I made the choir using a class and for loops. The user has to hold the space bar and move the mouse around to control the choir. The pitch of the choir changes depending on the mouse Y position. Since there is no frequency method, I used the the rate method to change the speed. This worked pretty nice honestly. I mapped the mouse X position to the pan of the audio to give another element of a real choir as well. To add some interactivity, I made the mouth size change depending on the pitch, as well as the redness in their faces as the pitch gets higher. I made the choir boys eyes open and close depending if they are singing or not. I added some shake to their head to make it more realistic as well as a return function to make the choir boys come back to normal after the user releases the space bar. I made the red faces come back at different paces to make it seem more unique to each individual as well. I made a couple different hair styles as well for the uniqueness factor. I also added another choir song, which is actually the choir from gangster's paradise. For the images, I drew the play and stop button, the hand in the theremin, the robes, the open and closed eyes, and the different hair styles. There was a lot more I wish I could've added, such as teh capability to play the instruments together, or another instrument entirely (I had planned to make an otamatone). Unfortunately, I didn't have the time to achieve this, but I am proud of what I made regardless.
I hope you enjoy :> 

Credits for drum kit: 
Drum1 sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/tom-tom-drums-275
Drum2 sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/snare-drum-279
Drum3 sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/tom-tom-drums-275
Drum4 sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/snare-drum-279
Cymbal1 sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/cymbal-276
Cymbal2 sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/cymbal-276
Bass sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/bass-drum-274
Drum song 1: https://drumeoblog.s3.amazonaws.com/beat/wp-content/uploads/2020/07/22180902/115-jazz-play-along-1.mp3
Drum song 2: https://drumeoblog.s3.amazonaws.com/beat/wp-content/uploads/2020/07/22185358/play-along-noclick.mp3
Drum song 3: https://drumeoblog.s3.amazonaws.com/beat/wp-content/uploads/2020/07/22180943/109-funk-drumming-play-along-1.mp3
Drum song 4: https://drumeoblog.s3.amazonaws.com/beat/wp-content/uploads/2020/07/22180958/118-latin-bossa-nova-play-along.mp3
Drum song 5: https://drumeoblog.s3.amazonaws.com/beat/wp-content/uploads/2020/07/22181027/122-progressive-play-along.mp3
(all songs made by Nathan Bosch)

Credits for the theremin:
Game sound effect: https://pixabay.com/sound-effects/search/game/
Game winning sound effect: https://pixabay.com/sound-effects/level-win-6416/
Sine wave image: https://thenounproject.com/browse/icons/term/sine-wave/
Triangle wave image: https://thenounproject.com/icon/triangle-wave-385869/
Square wave image: https://thenounproject.com/browse/icons/term/square-wave/
Sawtooth wave image: https://thenounproject.com/browse/icons/term/sawtooth-wave/

Credits for the choir: 
Choir sound 1: https://www.youtube.com/watch?v=m9IQ6Y6_a4o
Choir sound 2: https://www.youtube.com/watch?v=N2uo2lL9rvo
Choir background: https://hamptonschristian.com/church-interior-blur-abstract-background/ 

