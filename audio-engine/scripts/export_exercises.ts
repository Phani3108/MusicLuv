/**
 * Export the shared TS exercise + rubric catalogs as JSON so the Python
 * corpus harness can resolve a take's target by exerciseId.
 *
 *   cd server && npx tsx ../audio-engine/scripts/export_exercises.ts \
 *     > ../audio-engine/tests/fixtures/real/exercises.json
 */
import { EXERCISES } from "../../shared/catalogs/exerciseCatalog";
import { RUBRICS } from "../../shared/catalogs/gradingRubricCatalog";

process.stdout.write(JSON.stringify({ exercises: EXERCISES, rubrics: RUBRICS }, null, 1));
