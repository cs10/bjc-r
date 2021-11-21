from lab10 import Beater, Chaser, Seeker, Keeper
import random

def main():
	print("What position do you want to play?")
	while True:
		position = input()
		if position.lower() == "beater":
			player = Beater("Player", 100)
			time = 0
			draco_location = random.randint(1, 50)
			print("Guess where Draco is (a number between 1 and 50, inclusive) before you run out of energy, so you can knock him out with a bludger!")
			while True:
				guess = int(input())
				time += 10
				if guess == draco_location:
					print("You win!")
					return
				elif player.energy(time) <= 0:
					print("You ran out of energy! Draco escaped.")
					return
				else:
					print("Guess again!")
		elif position.lower() == "chaser":
			player = Chaser("Player", 100, 0)
			time = 0
			goal_location = random.randint(1, 6)
			print("Try to score as many goals as you can before you run out of energy, by correctly guessing a number between 1 and 5 (inclusive) as many times as you can!")
			while True:
				guess = int(input())
				time += 10
				if guess == goal_location:
					player.goals += 1
					goal_location = random.randint(1, 5)
					print("You scored a goal! Keep going!")
				elif player.energy(time) <= 0:
					print("You ran out of energy! You scored", player.goals, "goals!")
					return
				else:
					print("Guess again!")
		elif position.lower() == "seeker":
			player = Seeker("Player", 100)
			time = 0
			snitch_location = random.randint(1, 50)
			print("Guess where the snitch is (a number between 1 and 50, inclusive) before you run out of energy!")
			while True:
				guess = int(input())
				time += 10
				if guess ==  snitch_location:
					print("You win!")
					return
				elif player.energy(time) <= 0:
					print("You ran out of energy! Draco caught the snitch before you did.")
					return
				else:
					print("Guess again!")
		elif position.lower() == "keeper":
			player = Keeper("Player", 100)
			time = 0
			ball_location = random.randint(1, 10)
			print("Block the quaffle by guessing its location (a number between 1 and 10, inclusive) before you run out of energy!")
			while True:
				guess = int(input())
				time += 10
				if guess == ball_location:
					print("You blocked the quaffle! Good job!")
					return
				elif player.energy(time) <= 0:
					print("You ran out of energy and let the quaffle in!")
					return
				else:
					print("Guess again!")
		else:
			print("Invalid position. Please try again.")

if __name__ == '__main__':
	main()
