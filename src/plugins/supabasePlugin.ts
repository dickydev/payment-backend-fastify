import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../supabaseClient';

const supabasePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('supabase', supabase);
};

export default supabasePlugin;