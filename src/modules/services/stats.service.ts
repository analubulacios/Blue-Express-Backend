
import { CreateStatsDto } from "../dtos/stats.dto";
import Stats from "../models/stats.model";

class StatsService {
  async createStat(body: CreateStatsDto) {
    try {
      const createStats = await Stats.create({
        click_count: body.click_count,
        last_accessed: body.last_accessed,
        url_id: body.url_id,
      });

      return createStats;
    } catch (error) {
      throw new Error("No se pudo creo la estadistica deseada");
    }
  }
}

export default new StatsService();