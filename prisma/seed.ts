import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subjects = [
  {
    name: "Mathematics",
    description: "The study of numbers, quantities, shapes, and patterns.",
  },
  {
    name: "Physics",
    description:
      "The natural science that studies matter, its motion, and behavior through space and time.",
  },
  {
    name: "Chemistry",
    description:
      "The science that studies the composition, structure, properties, and changes of matter.",
  },
  {
    name: "Biology",
    description:
      "The study of living organisms, including their structure, function, growth, evolution, and distribution.",
  },
  {
    name: "History",
    description: "The study of past events, particularly in human affairs.",
  },
  {
    name: "English Literature",
    description: "The study of literature written in the English language.",
  },
  {
    name: "Computer Science",
    description:
      "The study of computation, automation, and information, encompassing both hardware and software.",
  },
  {
    name: "Economics",
    description:
      "The social science that studies the production, distribution, and consumption of goods and services.",
  },
  {
    name: "Psychology",
    description:
      "The study of mind and behavior, exploring various aspects of conscious and unconscious experience.",
  },
  {
    name: "Geography",
    description:
      "The study of places and the relationships between people and their environments.",
  },
  {
    name: "Philosophy",
    description:
      "The study of the fundamental nature of knowledge, reality, and existence.",
  },
  {
    name: "Art",
    description:
      "The expression or application of human creative skill and imagination, typically in a visual form.",
  },
];

async function main() {
  for (const subject of subjects) {
    await prisma.subject.create({
      data: subject,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
