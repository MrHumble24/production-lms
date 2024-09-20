// services/authService.ts

import { Admin, CompanyOwner, Student, Teacher } from "@prisma/client";
import { generateToken } from "../auth/generateToken";
import prisma from "../prisma/client";

/**
 * Authenticates a user and generates a JWT token if the credentials are valid.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A JWT token if authentication is successful, otherwise throws an error.
 */

export const authenticateTeacher = async (
  email: string,
  password: string
): Promise<{ token: string; teacher: Teacher }> => {
  const teacher = await prisma.teacher.findUnique({
    where: { email },
    include: {
      branch: {
        include: {
          tenant: true,
        },
      },
    },
  });

  if (!teacher || teacher.password !== password) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken(String(teacher.id), {
    role: teacher.role,
  });
  return { token, teacher };
};

/**
 * Authenticates a user and generates a JWT token if the credentials are valid.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A JWT token if authentication is successful, otherwise throws an error.
 */

export const authenticateStudent = async (
  email: string,
  password: string
): Promise<{ token: string; student: Student }> => {
  const student = await prisma.student.findUnique({
    where: { email: email.trimEnd().toLowerCase() },
    include: {
      branch: {
        include: {
          tenant: true,
        },
      },
    },
  });
  console.log(student);
  if (!student || student.password?.toString() !== password.toString()) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken(String(student.id), {
    role: student.role,
  });

  console.log({ token, student });
  return { token, student };
};

/**
 * Authenticates a user and generates a JWT token if the credentials are valid.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A JWT token if authentication is successful, otherwise throws an error.
 */

export const authenticateAdmin = async (
  email: string,
  password: string
): Promise<{ token: string; admin: Admin }> => {
  // Retrieve user by email
  const admin = await prisma.admin.findUnique({
    where: { email },
    include: {
      branch: {
        include: {
          tenant: true,
        },
      },
    },
  });

  if (!admin || admin.password !== password) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken(String(admin.id), {
    role: admin.role,
  });
  return { token, admin };
};

export const authenticateCompanyOwner = async (
  email: string,
  password: string
): Promise<{ token: string; companyOwner: CompanyOwner }> => {
  // Retrieve user by email
  const companyOwner = await prisma.companyOwner.findUnique({
    where: { email },
    include: {
      tenant: {
        include: {
          branches: true,
        },
      },
    },
  });

  if (!companyOwner || companyOwner.password !== password) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken(String(companyOwner.id), {
    role: companyOwner.role,
  });
  return { token, companyOwner };
};
