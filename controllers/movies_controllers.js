import prisma from '../db/db.js';

class Movies {
    static async getAll(req, res) {
        try {
            const { page } = req.query;
            const limit = 10;
            const skip = (page - 1) * limit;

            const data = await prisma.movies.findMany({
                skip: skip,
                take: limit,
            });

            res.status(200).json({
                message: 'Get data success',
                data: data,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async post(req, res) {
        try {
            const { title, genres, year } = req.body;

            if (!title || !genres || !year) return res.status(400).json({
                message: "Invalid input"
            });

            const existingMovies = await prisma.movies.findFirst({
                where: {
                    title: title
                }
            });

            if (existingMovies) return res.status(400).json({
                message: 'Movies already exist'
            });

            const createMovies = await prisma.movies.create({
                data: {
                    title: title,
                    genres: genres,
                    year: year,
                }
            });

            res.status(200).json({
                message: 'Create movies Success',
                data: createMovies
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async put(req, res) {
        try {
            const { id } = req.params
            const { title, genres, year } = req.body;

            if (!id) return res.status(404).json({
                message: 'Data movies not found'
            })

            if (!title || !genres || !year) return res.status(400).json({
                message: 'Invalid input'
            });

            const editMovies = await prisma.movies.update({
                where: {
                    id: parseInt(id),
                }, data: {
                    title: title,
                    genres: genres,
                    year: year,
                }
            });

            res.status(200).json({
                message: 'Update movies success',
                data: editMovies
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params

            if (!id) return res.status(404).json({
                message: 'Data movies not found'
            });

            const deleteMovies = await prisma.movies.delete({
                where: {
                    id: parseInt(id)
                }
            });

            res.status(200).json({
                message: 'Delete movies successfully',
                deleteMovies
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

export default Movies;