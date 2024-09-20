// lead.service.ts
import { PrismaClient, Lead, LeadStatus, LeadSource } from "@prisma/client";

const prisma = new PrismaClient();

class LeadService {
  async createLead(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    interestedIn?: string;
    status?: LeadStatus;
    source?: LeadSource;
    followUpDate?: Date;
    notes?: string;
    branchId?: number;
  }): Promise<Lead> {
    const {
      firstName,
      lastName,
      email,
      phone,
      branchId,
      interestedIn,
      status,
      source,
      followUpDate,
      notes,
    } = data;
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        branch: {
          connect: {
            id: Number(branchId),
          },
        },
        interestedIn,
        status,
        source,
        followUpDate,
        notes,
      },
    });
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return prisma.lead.findMany();
  }

  async getLeadById(id: number): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { id },
    });
  }

  async updateLead(
    id: number,
    data: Partial<Omit<Lead, "id" | "createdAt" | "updatedAt">>
  ): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async deleteLead(id: number): Promise<Lead> {
    return prisma.lead.delete({
      where: { id },
    });
  }
}

export default new LeadService();
