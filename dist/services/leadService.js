"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// lead.service.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class LeadService {
    createLead(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, phone, branchId, interestedIn, status, source, followUpDate, notes, } = data;
            const lead = yield prisma.lead.create({
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
        });
    }
    getLeads() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.lead.findMany();
        });
    }
    getLeadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.lead.findUnique({
                where: { id },
            });
        });
    }
    updateLead(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.lead.update({
                where: { id },
                data,
            });
        });
    }
    deleteLead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.lead.delete({
                where: { id },
            });
        });
    }
}
exports.default = new LeadService();
