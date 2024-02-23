import statsService from "../services/stats.service";

class StatsController {
  async createStat(req: any, res: any) {
    try {
      const stat = await statsService.createStat(req.body);
      res.status(201).json(stat);
    } catch (error) {
      res.status(500).json({ error: "No pudimos crear la estadistica" });
    }
  }
}

export default new StatsController();