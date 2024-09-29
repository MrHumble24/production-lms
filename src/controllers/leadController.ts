// lead.controller.ts
import { Request, Response } from "express";
import LeadService from "../services/leadService";

class LeadController {
  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await LeadService.createLead(req.body);
      res.status(201).json(lead);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create lead", details: error });
    }
  }

  async getLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = await LeadService.getLeads();
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
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads", details: error });
    }
  }

  async getLeadById(req: Request, res: Response): Promise<void> {
    try {
      const lead = await LeadService.getLeadById(Number(req.params.id));
      if (lead) {
        res.status(200).json(lead);
      } else {
        res.status(404).json({ error: "Lead not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lead", details: error });
    }
  }

  async updateLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await LeadService.updateLead(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(lead);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update lead", details: error });
    }
  }

  async deleteLead(req: Request, res: Response): Promise<void> {
    try {
      await LeadService.deleteLead(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lead", details: error });
    }
  }
}

export default new LeadController();
