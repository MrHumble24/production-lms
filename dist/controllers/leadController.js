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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leadService_1 = __importDefault(require("../services/leadService"));
class LeadController {
    createLead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield leadService_1.default.createLead(req.body);
                res.status(201).json(lead);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to create lead", details: error });
            }
        });
    }
    getLeads(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leads = yield leadService_1.default.getLeads();
                const news = leads.filter((l) => l.status === "NEWS");
                const contacted = leads.filter((l) => l.status === "CONTACTED");
                const qualified = leads.filter((l) => l.status === "QUALIFIED");
                const converted = leads.filter((l) => l.status === "CONVERTED");
                const disqualified = leads.filter((l) => l.status === "DISQUALIFIED");
                const followUp = leads.filter((l) => l.status === "FOLLOWUP");
                res.status(200).json({
                    news,
                    contacted,
                    qualified,
                    converted,
                    disqualified,
                    followUp,
                });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch leads", details: error });
            }
        });
    }
    getLeadById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield leadService_1.default.getLeadById(Number(req.params.id));
                if (lead) {
                    res.status(200).json(lead);
                }
                else {
                    res.status(404).json({ error: "Lead not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch lead", details: error });
            }
        });
    }
    updateLead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield leadService_1.default.updateLead(Number(req.params.id), req.body);
                res.status(200).json(lead);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to update lead", details: error });
            }
        });
    }
    deleteLead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield leadService_1.default.deleteLead(Number(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete lead", details: error });
            }
        });
    }
}
exports.default = new LeadController();
